import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import esClient from '../utils/es/esClient';

const getIssuePoints = issue => {
  if (issue.labels !== undefined) {
    //Get points from labels
    // Regex to test: SP:[.\d]
    let pointsExp = RegExp('SP:[.\\d]');
    //let pointsLabelExp = RegExp('loe:(?<name>.+)');
    for (var currentLabel of issue.labels.edges) {
      if (pointsExp.test(currentLabel.node.name)) {
        let points = parseInt(currentLabel.node.name.replace('SP:', ''));
        return points;
      } else if (pointsExp.test(currentLabel.node.description)) {
        let points = parseInt(currentLabel.node.description.replace('SP:', ''));
        return points;
      }
    }
    return null;
  }
};

@Injectable()
export class IssuesService {
  async getIssues(
    EsSettings: any,
    query: String,
    paginationFrom: Number,
    paginationSize: Number,
  ): Promise<any> {
    const client = await esClient(EsSettings);
    console.log(paginationFrom);
    console.log(paginationSize);
    const issues: ApiResponse = await client.search({
      index: 'gh_issues_*',
      body: {
        from: paginationFrom,
        size: paginationSize,
        query: {
          match_all: {},
        },
      },
    });

    // Parse out Elasticsearch-specific response
    // Add points to issues
    return {
      total: issues.body.hits.total.value,
      issues: issues.body.hits.hits
        .map(hit => hit._source)
        .map(issue => {
          return { ...issue, points: getIssuePoints(issue) };
        }),
    };
    return issues;
  }
}

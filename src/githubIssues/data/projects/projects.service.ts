import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ConfService } from '../../../conf.service';

import { EsClientService } from '../../../esClient.service';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../../../utils/query';

import Project from '../../../utils/github/types/project';

@Injectable()
export default class DataProjectsService {
  constructor(private readonly confService: ConfService, private readonly esClientService: EsClientService) {}

  // Naive implementation, get all issues (assuming the query already reduces the dataset by filtering on issues with projects)
  // Then aggregating manually on that list

  async getProjects(query: any): Promise<any> {
    const esClient = this.esClientService.getEsClient();
    const userConfig = this.confService.getUserConfig();

    //1- Convert the SQON query to an ES query
    const queryObj = JSON.parse(query);
    const nestedFields = getNestedFields(queryObj);
    const prepQuery = {
      nestedFields,
      filters: queryObj,
    };
    let updatedQuery = await buildQuery(prepQuery);
    if (Object.entries(updatedQuery).length === 0) {
      updatedQuery = {
        match_all: {},
      };
    }

    const esIndex = userConfig.elasticsearch.dataIndices.githubIssues + '*';

    // 2- Count the number of documents (to determine query method, which will be different if above or below 10000)
    const countDocuments: ApiResponse = await esClient.count({
      index: esIndex,
      body: {
        query: updatedQuery,
      },
    });
    const docCount = countDocuments.body.count;

    let issues: any[] = [];
    if (docCount >= 9999) {
      // More than 9999 documents, using scroll API
      const scrollSearch = esClient.helpers.scrollSearch({
        index: esIndex,
        body: {
          query: updatedQuery,
        },
      });
      for await (const result of scrollSearch) {
        issues = [...issues, ...result.documents];
      }
    } else {
      // Less than 9999 documents, regular search
      const esQuery = {
        index: esIndex,
        body: {
          from: 0,
          size: docCount,
          query: updatedQuery,
        },
      };
      const datasets: ApiResponse = await esClient.search(esQuery);
      issues = datasets.body.hits.hits.map((i: any) => i._source);
    }

    const projects: any[] = issues.reduce((acc, issue) => {
      if (issue.projectCards.totalCount > 0) {
        for (const card of issue.projectCards.edges) {
          if (!acc.find((p: Project) => p.id === card.node.project.id)) {
            acc.push(card.node.project);
          }
        }
      }
      return acc;
    }, []);

    return { totalCount: projects.length, nodes: projects };
  }
}

import { Injectable } from '@nestjs/common';
import { performance } from 'perf_hooks';

import { ConfService } from '../../../conf.service';

import { EsClientService } from '../../../esClient.service';

const formatNode = (node: any, distance: number) => {
  return {
    id: node.id,
    group: 'nodes',
    label: node.title,
    data: {
      ...node,
      distance: distance,
    },
  };
};

const formatEdge = (timelineItem: any) => {
  return {
    id: timelineItem.id,
    group: 'edges',
    data: {
      id: timelineItem.id,
      source: timelineItem.source.id,
      target: timelineItem.target.id,
    },
  };
};

@Injectable()
export default class DataNetworkService {
  constructor(private readonly confService: ConfService, private readonly esClientService: EsClientService) {}

  graphData = [];

  async getNodeByIds(nodes: string[]) {
    const esClient = this.esClientService.getEsClient();
    const userConfig = this.confService.getUserConfig();
    const esIssuesIndex = userConfig.elasticsearch.dataIndices.githubIssues;
    const esPrsIndex = userConfig.elasticsearch.dataIndices.githubPullrequests;

    const nodesSearch: any = await esClient.mget({
      index: esIssuesIndex,
      body: {
        docs: [
          ...nodes.map((n: string) => {
            return { _index: esIssuesIndex, _id: n };
          }),
          ...nodes.map((n: string) => {
            return { _index: esPrsIndex, _id: n };
          }),
        ],
      },
    });
    return nodesSearch.body.docs.map((d: any) => d._source).filter((n: any) => n !== undefined);
  }

  async exploreGraph(node: any, distance: number) {
    for (const link of node.timelineItems.edges) {
      const formattedEdge = formatEdge(link.node);
      // check if link is already present
      const linkFound = this.graphData.find(
        (g: any) => formattedEdge.data.source === g.data.source && formattedEdge.data.target === g.data.target,
      );
      // We only process the links if it is not already present
      // Otherwise we skip since it means this was already process and we don't need duplicate links
      if (linkFound === undefined) {
        this.graphData.push(formattedEdge);

        // We then start looking into target and source nodes
        console.log(link);
        const sourceNode = this.graphData.find((g: any) => g.id === formattedEdge.data.source);
        if (sourceNode === undefined) {
          const nodeExists = await this.getNodeByIds([formattedEdge.data.source]);
          let node: any = {};
          if (nodeExists[0] === undefined) {
            node = formatNode({ ...link, partial: true }, distance + 1);
            this.graphData.push(node);
          } else {
            node = formatNode({ ...nodeExists[0], partial: false }, distance + 1);
            this.graphData.push(node);
          }
          // If a node exists, then it can be further processed, otherwise we stop here and end up with a leaf
          if (nodeExists[0] !== undefined) {
            await this.exploreGraph(nodeExists[0], distance + 1);
          }
        }
        const targetNode = this.graphData.find((g: any) => g.id === formattedEdge.data.target);
        if (targetNode === undefined) {
          const nodeExists = await this.getNodeByIds([formattedEdge.data.target]);
          let node: any = {};
          if (nodeExists[0] === undefined) {
            node = formatNode({ ...link, partial: true }, distance + 1);
            this.graphData.push(node);
          } else {
            node = formatNode({ ...nodeExists[0], partial: false }, distance + 1);
            this.graphData.push(node);
          }
          // If a node exists, then it can be further processed, otherwise we stop here and end up with a leaf
          if (nodeExists[0] !== undefined) {
            await this.exploreGraph(nodeExists[0], distance + 1);
          }
        }
      }
      // this.graphData.push(formatEdge(link.node));
    }
  }

  // The network is built starting from a list of nodes, from which we are grabbing linked nodes
  // Note that those linked notes can be either in the issues or PR indices

  async getNetwork(rootNodes: string[]): Promise<any> {
    const t0 = performance.now();

    const nodes = await this.getNodeByIds(rootNodes);

    // const graphData: any = [];
    this.graphData = [];
    for (const node of nodes) {
      if (this.graphData.find((n: any) => n.id === node.id) === undefined) {
        this.graphData.push(formatNode(node, 0));
        await this.exploreGraph(node, 0);
      }
    }

    const t1 = performance.now();
    const callDuration = Math.round(t1 - t0);
    return { totalCount: this.graphData.length, processTime: callDuration, nodes: this.graphData };
  }
}

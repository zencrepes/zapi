import { Injectable } from '@nestjs/common';
import { performance } from 'perf_hooks';

import { ConfService } from '../../../conf.service';

import { EsClientService } from '../../../esClient.service';
import DataItemsService from '../../../utils/data/items/items.service';

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

const formatEdge = (timelineItem: any, distance: number) => {
  return {
    id: timelineItem.id,
    group: 'edges',
    data: {
      id: timelineItem.id,
      source: timelineItem.source.id,
      target: timelineItem.target.id,
      distance: distance,
    },
  };
};

@Injectable()
export default class DataNetworkService {
  constructor(
    private readonly confService: ConfService,
    private readonly esClientService: EsClientService,
    private readonly itemsService: DataItemsService,
  ) {}

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
    return nodesSearch.body.docs
      .filter((d: any) => d._source !== undefined)
      .map((d: any) => {
        return { ...d._source, typename: d._index === esIssuesIndex ? 'Issue' : 'PullRequest' };
      });
  }

  async getNodeByQuery(query: string, nodesCount: number) {
    const userConfig = this.confService.getUserConfig();

    const data = await this.itemsService.findAll(
      0,
      nodesCount,
      query,
      undefined,
      userConfig.elasticsearch.dataIndices.githubIssues + '*',
    );
    return data.nodes.map((n: any) => {
      return { ...n, typename: 'Issue' };
    });
  }

  async exploreGraph(node: any, distance: number) {
    for (const link of node.timelineItems.edges) {
      const formattedEdge = formatEdge(link.node, distance + 1);
      // check if link is already present
      const linkFound = this.graphData.find(
        (g: any) => formattedEdge.data.source === g.data.source && formattedEdge.data.target === g.data.target,
      );
      // We only process the links if it is not already present
      // Otherwise we skip since it means this was already process and we don't need duplicate links
      if (linkFound === undefined) {
        this.graphData.push(formattedEdge);

        // We then start looking into target and source nodes
        const sourceNode = this.graphData.find((g: any) => g.id === formattedEdge.data.source);
        if (sourceNode === undefined) {
          const nodeExists = await this.getNodeByIds([formattedEdge.data.source]);
          let node: any = {};

          if (nodeExists.length === 0) {
            node = formatNode({ ...link.node.source, partial: true }, distance + 1);
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

  // The network can start from 2 inputs:
  // - A query: The top 100 elements from a query
  // - A pre-selected list of nodes
  // And from there build a list of nodes
  // If both are provided, the list of nodes takes over
  // Note that those linked notes can be either in the issues or PR indices

  async getNetwork(rootNodes: string[], query: string): Promise<any> {
    const t0 = performance.now();

    let nodes: any[] = [];
    let source = '';
    if (rootNodes.length > 0) {
      source = 'id';
      nodes = await this.getNodeByIds(rootNodes);
    } else {
      source = 'query';
      nodes = await this.getNodeByQuery(query, 5000);
    }

    this.graphData = [];
    for (const node of nodes.filter((n: any) => n.timelineItems.totalCount > 0)) {
      const currentRoot = this.graphData.filter((i: any) => i.data.distance === 0 && i.group === 'nodes');
      // We limit ourselves to processing 100 root nodes, which alreaydy gives an unknown number of leaves
      if (this.graphData.find((n: any) => n.id === node.id) === undefined && currentRoot.length < 100) {
        this.graphData.push(formatNode({ ...node, partial: false }, 0));
        await this.exploreGraph(node, 0);
      }
    }

    const dataResponse = this.graphData.filter((n: any) => n.id !== null && n.id !== undefined);

    const t1 = performance.now();
    const callDuration = Math.round(t1 - t0);
    return { totalCount: dataResponse.length, processTime: callDuration, nodes: dataResponse, source };
  }
}

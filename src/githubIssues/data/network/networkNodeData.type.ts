import { Field, ObjectType, Int } from '@nestjs/graphql';

import Issue from '../../../utils/github/types/issue';

@ObjectType()
export default class IssueNetworkNodeData extends Issue {
  @Field(() => String, {
    nullable: true,
    description: 'If the node is an edge, target is the target id of the edge element',
  })
  target: string;

  @Field(() => String, {
    nullable: true,
    description: 'If the node is an edge, source is the source id of the edge element',
  })
  source: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Distance in the tree',
  })
  distance: number;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Is this node data partial?',
  })
  partial: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Title of the node',
  })
  title: string;

  @Field(() => String, {
    nullable: true,
    description: 'State of the node',
  })
  state: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Issue or PR number',
  })
  number: number;

  @Field(() => String, {
    nullable: true,
    description: 'Type of the node (Issue or PR)',
  })
  typename: string;
}

/*
[0]     source: {
[0]       typename: 'Issue',
[0]       id: 'MDU6SXNzdWU2NzUyNTA1MTA=',
[0]       number: 3641,
[0]       title: 'DMF-1924 - Datetime data type management',
[0]       state: 'OPEN',
[0]       url: 'https://github.com/Jahia/Sandbox_AgileJahia/issues/3641'
[0]     },
*/

import { Field, ObjectType } from '@nestjs/graphql';

import BucketWeek from './week.type';

@ObjectType()
export default class ActivityBucket {
  @Field({
    nullable: false,
    description: 'The Bucket key',
  })
  key: string;

  @Field({
    nullable: true,
    description: 'Representation of the key as a string (useful for dates)',
  })
  keyAsString: string;

  @Field({
    nullable: false,
    description: 'The number of elements in the bucket',
  })
  docCount: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [BucketWeek], {
    nullable: false,
    description: 'Weeks of activity',
  })
  weeks: BucketWeek[];
}

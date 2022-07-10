import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Statistics {
  @Field(() => String, {
    nullable: true,
    description: 'Name of the transaction',
  })
  transaction: string;

  @Field({
    nullable: true,
    description: 'sampleCount result',
  })
  sampleCount: number;

  @Field({
    nullable: true,
    description: 'errorCount result',
  })
  errorCount: number;

  @Field({
    nullable: true,
    description: 'errorPct result',
  })
  errorPct: number;

  @Field({
    nullable: true,
    description: 'meanResTime result',
  })
  meanResTime: number;

  @Field({
    nullable: true,
    description: 'medianResTime result',
  })
  medianResTime: number;

  @Field({
    nullable: true,
    description: 'minResTime result',
  })
  minResTime: number;

  @Field({
    nullable: true,
    description: 'maxResTime result',
  })
  maxResTime: number;

  @Field({
    nullable: true,
    description: 'pct1ResTime result',
  })
  pct1ResTime: number;

  @Field({
    nullable: true,
    description: 'pct2ResTime result',
  })
  pct2ResTime: number;

  @Field({
    nullable: true,
    description: 'pct3ResTime result',
  })
  pct3ResTime: number;

  @Field({
    nullable: true,
    description: 'throughput result',
  })
  throughput: number;

  @Field({
    nullable: true,
    description: 'receivedKBytesPerSec result',
  })
  receivedKBytesPerSec: number;

  @Field({
    nullable: true,
    description: 'sentKBytesPerSec result',
  })
  sentKBytesPerSec: number;
}

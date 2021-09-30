import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Statistics {
  @Field(() => String, {
    nullable: false,
    description: 'Name of the transaction',
  })
  transaction: string;

  @Field({
    nullable: false,
    description: 'sampleCount result',
  })
  sampleCount: number; 

  @Field({
    nullable: false,
    description: 'errorCount result',
  })
  errorCount: number; 

  @Field({
    nullable: false,
    description: 'errorPct result',
  })
  errorPct: number; 

  @Field({
    nullable: false,
    description: 'meanResTime result',
  })
  meanResTime: number; 

  @Field({
    nullable: false,
    description: 'medianResTime result',
  })
  medianResTime: number; 

  @Field({
    nullable: false,
    description: 'minResTime result',
  })
  minResTime: number; 

  @Field({
    nullable: false,
    description: 'maxResTime result',
  })
  maxResTime: number; 

  @Field({
    nullable: false,
    description: 'pct1ResTime result',
  })
  pct1ResTime: number; 

  @Field({
    nullable: false,
    description: 'pct2ResTime result',
  })
  pct2ResTime: number; 

  @Field({
    nullable: false,
    description: 'pct3ResTime result',
  })
  pct3ResTime: number; 

  @Field({
    nullable: false,
    description: 'throughput result',
  })
  throughput: number; 

  @Field({
    nullable: false,
    description: 'receivedKBytesPerSec result',
  })
  receivedKBytesPerSec: number; 

  @Field({
    nullable: false,
    description: 'sentKBytesPerSec result',
  })
  sentKBytesPerSec: number; 

}

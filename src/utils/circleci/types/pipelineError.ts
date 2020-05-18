import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class PipelineError {
  @Field(() => String, {
    nullable: false,
    description: 'Type of error',
  })
  type: string;

  @Field(() => String, {
    nullable: false,
    description: 'Message of the error',
  })
  message: string;
}

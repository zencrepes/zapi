import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class PipelineTriggerActor {
  @Field(() => String, {
    nullable: false,
    description: 'Login of the user',
  })
  login: string;

  @Field(() => String, {
    nullable: true,
    description: 'Avatar URL of the user',
  })
  avatar_url: string;
}

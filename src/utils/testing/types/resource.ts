import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Resource {
  @Field(() => ID, {
    nullable: true
  })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the resource',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Size of the resource',
  })
  size: string;  

  @Field(() => String, {
    nullable: false,
    description: 'Name of the container that was used',
  })
  image: string;

  @Field(() => String, {
    nullable: true,
    description: 'JSON.stringify() of the tfsettings file',
  })
  tfsettings: string;

}

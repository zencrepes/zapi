import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class JiraAvatarUrls {
  @Field(() => String, {
    nullable: true,
    description: 'Avatar URL, 16x16 pixels',
  })
  xsmall: string;

  @Field(() => String, {
    nullable: true,
    description: 'Avatar URL, 24x24 pixels',
  })
  small: string;

  @Field(() => String, {
    nullable: true,
    description: 'Avatar URL, 32x32 pixels',
  })
  medium: string;

  @Field(() => String, {
    nullable: true,
    description: 'Avatar URL, 48x48 pixels',
  })
  large: string;
}

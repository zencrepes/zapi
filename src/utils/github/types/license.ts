import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class License {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'The lowercased SPDX ID of the license',
  })
  key: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the label name.',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Customary short name if applicable (e.g, GPLv3)',
  })
  nickname: string;

  @Field(() => String, {
    nullable: true,
    description: 'Short identifier specified by <https://spdx.org/licenses>',
  })
  spdxId: string;

  @Field(() => String, {
    nullable: true,
    description: 'URL to the license on <https://choosealicense.com>',
  })
  url: string;
}

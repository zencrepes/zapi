import { Field, ObjectType } from '@nestjs/graphql';

import User from '../../../utils/github/types/user';
import VelocityItem from './velocityItem.type';

@ObjectType({ isAbstract: true })
export default abstract class VelocityConnection {
  @Field(() => [User], {
    nullable: false,
    description: 'Assignees used to calculate velocity',
  })
  assignees: User[];

  @Field(() => [VelocityItem], {
    nullable: false,
    description: 'Veloticy Weeks',
  })
  items: VelocityItem[];

  @Field(() => VelocityItem, {
    nullable: true,
    description: 'Current Velocity data',
  })
  current: VelocityItem;
}

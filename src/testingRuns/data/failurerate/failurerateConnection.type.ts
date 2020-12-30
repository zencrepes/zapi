import { ObjectType } from '@nestjs/graphql';

import FailureRateConnection from '../../../utils/data/failurerate/failurerateConnection.type';

@ObjectType()
export default class TestingRunsFailureRateConnection extends FailureRateConnection {}

import { ObjectType } from '@nestjs/graphql';

import FailureRateCasesConnection from '../../../utils/data/failureratecases/failurerateConnection.type';

@ObjectType()
export default class TestingCasesFailureRateConnection extends FailureRateCasesConnection {}

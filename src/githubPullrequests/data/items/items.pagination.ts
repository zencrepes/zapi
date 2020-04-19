import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../../utils/pagination/pagination';
//import Item from './item.type';
import Pullrequest from '../../../utils/github/types/pullrequest';

@ObjectType()
export default class ItemConnection extends PaginatedResponse(Pullrequest) {}

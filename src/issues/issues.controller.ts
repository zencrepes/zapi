import {
  Controller,
  Req,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { IssuesService } from './issues.service';

@Controller('issues')
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  @Get()
  async getIssues(@Req() request: Request) {
    const connector = request.headers['x-cfgconnector'];
    if (request.headers['x-cfgconnector'] === undefined) {
      throw new HttpException(
        'Elasticsearch connection headers missing',
        HttpStatus.BAD_REQUEST,
      );
    }
    const query = request.query.q;
    const paginationFrom = request.query.f;
    const paginationSize = request.query.s;
    const issues = await this.issuesService.getIssues(
      JSON.parse(connector.toString()),
      query,
      paginationFrom,
      paginationSize,
    );
    return issues;
  }
}

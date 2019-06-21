import {
  Controller,
  Req,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { AliveService } from './alive.service';

@Controller('alive')
export class AliveController {
  constructor(private aliveService: AliveService) {}

  @Get()
  async getAlive(@Req() request: Request) {
    const connector = request.headers.cfg_connector;
    if (request.headers.cfg_connect === undefined) {
      throw new HttpException(
        'Elasticsearch connection headers missing',
        HttpStatus.BAD_REQUEST,
      );
    }
    const alive = await this.aliveService.getAlive(
      JSON.parse(connector.toString()),
    );
    return alive;
  }
}

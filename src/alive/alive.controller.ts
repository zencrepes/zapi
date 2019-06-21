import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { AliveService } from './alive.service';

@Controller('alive')
export class AliveController {
  constructor(private aliveService: AliveService) {}

  @Get()
  async getAlive(@Req() request: Request) {
    const connector = request.headers.cfg_connector;
    const alive = await this.aliveService.getAlive(
      JSON.parse(connector.toString()),
    );
    return alive;
  }
}

import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('load-games')
  public loadGames() {
    return this.appService.loadGames();
  }
}

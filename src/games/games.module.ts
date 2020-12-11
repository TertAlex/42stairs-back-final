import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}

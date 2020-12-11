import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DataApiModule } from './data-api/data-api.module';
import { TeamsModule } from './teams/teams.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    DatabaseModule,
    DataApiModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TeamsModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

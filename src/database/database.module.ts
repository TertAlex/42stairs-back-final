import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TeamsRepository } from './teams.repository';
import { teamsProviders } from './teams.providers';
import { gamesProviders } from './games.provider';
import { GamesRepository } from './games.repository';

@Module({
  providers: [...databaseProviders, ...teamsProviders, ...gamesProviders, TeamsRepository, GamesRepository],
  exports: [...databaseProviders, ...teamsProviders, ...gamesProviders, TeamsRepository, GamesRepository],
})
export class DatabaseModule {}

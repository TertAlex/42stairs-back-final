import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TeamsRepository } from './teams.repository';
import { teamsProviders } from './teams.providers';

@Module({
  providers: [...databaseProviders, ...teamsProviders, TeamsRepository],
  exports: [...databaseProviders, ...teamsProviders, TeamsRepository],
})
export class DatabaseModule {}

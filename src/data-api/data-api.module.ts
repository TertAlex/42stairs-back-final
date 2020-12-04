import { HttpModule, Module } from '@nestjs/common';
import { DataApiClient } from './data-api.client';
import { DataApi } from './data-api';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [DataApiClient, DataApi],
  exports: [DataApi],
})
export class DataApiModule {}

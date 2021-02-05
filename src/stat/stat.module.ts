import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';

@Module({ imports: [DatabaseModule], controllers: [StatController], providers: [StatService] })
export class StatModule {
}

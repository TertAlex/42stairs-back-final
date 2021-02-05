import { Controller, Get, Query } from '@nestjs/common';
import { StatService } from './stat.service';
import { IResultsFilter } from '../dto/stat/results.filter';
import { IResultsResponse } from '../dto/stat/results.response';
import { IWinRationResponse } from '../dto/stat/win-ration.response';
import { IPivotResponse } from '../dto/stat/pivot.response';

@Controller('stat')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Get('results')
  public getResults(@Query() query: IResultsFilter): Promise<IResultsResponse> {
    return this.statService.getResults(query);
  }

  @Get('win-ratio')
  public getWinRatio(@Query() query: IResultsFilter): Promise<IWinRationResponse> {
    return this.statService.getWinRatio(query);
  }

  @Get('pivot')
  public getPivot(): Promise<IPivotResponse> {
    return this.statService.getPivot();
  }
}

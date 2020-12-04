import { Injectable } from '@nestjs/common';
import { DataApiClient } from './data-api.client';
import { IGame } from './models/game';

@Injectable()
export class DataApi {
  constructor(private readonly dataApiClient: DataApiClient) {}

  public loadGames(): Promise<IGame[]> {
    return this.dataApiClient.get().toPromise();
  }
}

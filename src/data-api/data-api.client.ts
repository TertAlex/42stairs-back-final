import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class DataApiClient {
  private logger: Logger = new Logger(DataApiClient.name);

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  public get(): Observable<any> {
    const url = this.configService.get<string>('DATA_API_URL');
    return this.httpService.get(url).pipe(
      map((resp: AxiosResponse) => {
        return resp.data;
      }),
      catchError(error => {
        this.logger.error(error);
        return throwError(error);
      }),
    );
  }
}

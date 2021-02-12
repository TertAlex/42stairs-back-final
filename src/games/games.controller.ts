import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { IGameDto } from '../dto/game/game.dto';
import { IGameCreateDto } from '../dto/game/game-create.dto';
import { IGamesFilter } from '../dto/game/games.filter';
import { IGameIdDto } from '../dto/game/game-id.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  public getGame(@Param() params: IGameIdDto): Promise<IGameDto> {
    return this.gamesService.getGame(params.id);
  }

  @Delete(':id')
  public deleteGame(@Param() params: IGameIdDto): Promise<number> {
    return this.gamesService.deleteGame(params.id);
  }

  @Post()
  public createGame(@Body() gameCreateDto: IGameCreateDto): Promise<IGameDto> {
    return this.gamesService.createGame(gameCreateDto);
  }

  @Get()
  public getGames(@Query() query: IGamesFilter) {
    return this.gamesService.getGames(query);
  }
}

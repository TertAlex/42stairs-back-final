import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { IGameDto } from '../dto/game/game.dto';
import { IGameCreateDto } from '../dto/game/game-create.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {
  }

  @Get(':id')
  public getTeam(@Param() params): Promise<IGameDto> {
    return this.gamesService.getGame(params.id);
  }

  @Delete(':id')
  public deleteTeam(@Param() params): Promise<number> {
    return this.gamesService.deleteGame(params.id);
  }

  @Post()
  public createTeam(@Body() gameCreateDto: IGameCreateDto): Promise<IGameDto> {
    return this.gamesService.createGame(gameCreateDto);
  }
}

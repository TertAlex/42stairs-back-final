import { Injectable } from '@nestjs/common';
import { GamesRepository } from '../database/games.repository';
import { GameMapper } from './game.mapper';
import { IGameDto } from '../dto/game/game.dto';
import { IGameCreateDto } from '../dto/game/game-create.dto';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  public async getGame(id: string): Promise<IGameDto> {
    const gameModel = await this.gamesRepository.getGame(id);
    return GameMapper.IGameDtoFromGame(gameModel);
  }

  public deleteGame(id: string): Promise<number> {
    return this.gamesRepository.deleteGame(id);
  }

  public async createGame(gameCreateDto: IGameCreateDto): Promise<IGameDto> {
    const gameModel = await this.gamesRepository.createGame(gameCreateDto);
    return GameMapper.IGameDtoFromGame(gameModel);
  }
}

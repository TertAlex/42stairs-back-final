import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Game } from '../models/game';
import { IGameCreateDto } from '../dto/game/game-create.dto';
import { IGamesFilter } from '../dto/game/games.filter';

@Injectable()
export class GamesRepository {
  constructor(@Inject('GAME_MODEL') private gameModel: Model<Game>) {}

  public async saveGames(games: IGameCreateDto[]): Promise<Game[]> {
    const entities: Game[] = [];
    for (const game of games) {
      const entity = await this.createGame(game);
      entities.push(entity);
    }
    return entities;
  }

  public createGame(game: IGameCreateDto) {
    return this.gameModel.findOneAndUpdate(
      {
        date: game.date,
        homeTeamId: game.homeTeam.id,
        awayTeamId: game.awayTeam.id,
        homeTeamGoals: game.homeTeamGoals,
        awayTeamGoals: game.awayTeamGoals,
      },
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false },
    );
  }

  public async getGame(id: string): Promise<Game> {
    let game: Game;
    try {
      game = await this.gameModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    if (!Boolean(game)) throw new NotFoundException(`Game with id ${id} not found`);

    return game;
  }

  public async getGames(filter: IGamesFilter) {
    return await this.gameModel
      .find({
        $and: [
          Boolean(filter?.teamId) && Boolean(filter?.anotherTeamId)
            ? {
                $and: [
                  {
                    $or: [{ homeTeamId: filter?.teamId }, { awayTeamId: filter?.teamId }],
                  },
                  {
                    $or: [{ homeTeamId: filter?.anotherTeamId }, { awayTeamId: filter?.anotherTeamId }],
                  },
                ],
              }
            : Boolean(filter?.teamId)
            ? {
                $or: [
                  { homeTeamId: filter?.teamId },
                  { homeTeamId: filter?.anotherTeamId },
                  { awayTeamId: filter?.teamId },
                  { awayTeamId: filter?.anotherTeamId },
                ],
              }
            : {},
          Boolean(filter.date) ? { date: { $gte: filter.date, $lte: filter.date } } : {},
        ],
      })
      .exec();
  }

  public async deleteGame(id: string): Promise<number> {
    const result = await this.gameModel.deleteOne({ _id: id }).exec();
    return result.deletedCount;
  }
}

import { Game } from '../models/game';
import { IGameDto } from '../dto/game/game.dto';

export class GameMapper {
  public static IGameDtoFromGame(game: Game): IGameDto {
    return {
      awayTeamId: game.awayTeamId,
      homeTeamId: game.homeTeamId,
      date: game.date,
      awayTeamGoals: game.awayTeamGoals,
      homeTeamGoals: game.homeTeamGoals,
    };
  }
}

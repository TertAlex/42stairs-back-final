import { Game } from '../models/game';
import { IGameDto } from '../dto/game/game.dto';
import { TeamMapper } from '../teams/team.mapper';

export class GameMapper {
  public static IGameDtoFromGame(game: Game): IGameDto {
    return {
      awayTeam: TeamMapper.ITeamDtoFromTeam(game.awayTeam),
      homeTeam: TeamMapper.ITeamDtoFromTeam(game.homeTeam),
      date: game.date,
      awayTeamGoals: game.awayTeamGoals,
      homeTeamGoals: game.homeTeamGoals,
    };
  }
}

import { ITeamDto } from '../team/team.dto';

export interface IGameDto {
  date: Date;
  homeTeam: ITeamDto;
  awayTeam: ITeamDto;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

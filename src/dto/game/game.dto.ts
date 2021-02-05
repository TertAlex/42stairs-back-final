import { ITeamDto } from '../team/team.dto';

export interface IGameDto {
  date: Date;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

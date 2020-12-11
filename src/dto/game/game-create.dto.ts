import { Team } from '../../models/team';

export interface IGameCreateDto {
  date: Date;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

import { Document } from 'mongoose';
import { Team } from './team';

export interface Game extends Document {
  date: Date;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

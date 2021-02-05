import { Document } from 'mongoose';

export interface Game extends Document {
  date: Date;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

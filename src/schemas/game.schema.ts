import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const GameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  homeTeamGoals: { type: Number, required: true },
  awayTeamGoals: { type: Number, required: true },
});

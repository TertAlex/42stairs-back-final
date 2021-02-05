import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const GameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  homeTeamGoals: { type: Number, required: true },
  awayTeamGoals: { type: Number, required: true },
});

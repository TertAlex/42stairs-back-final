import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // TODO: ask about homeGames and awayGames
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
  ],
});

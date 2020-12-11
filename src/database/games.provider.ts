import { Connection } from 'mongoose';
import { GameSchema } from '../schemas/game.schema';

export const gamesProviders = [
  {
    provide: 'GAME_MODEL',
    useFactory: (connection: Connection) => connection.model('Game', GameSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

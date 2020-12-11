import { Injectable } from '@nestjs/common';
import { DataApi } from './data-api/data-api';
import { TeamsRepository } from './database/teams.repository';
import { ITeamCreateDto } from './dto/team/team-create.dto';
import { IGameCreateDto } from './dto/game/game-create.dto';
import { GamesRepository } from './database/games.repository';
import * as moment from 'moment';
import { IGame } from './data-api/models/game';
import { Team } from './models/team';

@Injectable()
export class AppService {
  constructor(
    private readonly dataApi: DataApi,
    private readonly teamsRepository: TeamsRepository,
    private readonly gamesRepository: GamesRepository,
  ) {
  }

  private saveTeams(games: IGame[]): Promise<Team[]> {
    const teams1 = games.map(game => game.HomeTeam);
    const teams2 = games.map(game => game.AwayTeam);
    const teams = teams1.concat(teams2);

    const uniqueTeams = teams.filter((item, pos) => teams.indexOf(item) === pos);

    const teamsToSave: ITeamCreateDto[] = uniqueTeams.map(team => {
      const teamModel: ITeamCreateDto = {
        name: team,
      };
      return teamModel;
    });

    return this.teamsRepository.saveTeams(teamsToSave);
  }

  private saveGames(games: IGame[], savedTeams: Team[]) {
    const gamesToSave: IGameCreateDto[] = [];
    for (const game of games) {
      const homeTeam = savedTeams.find(x => x.name === game.HomeTeam);
      const awayTeam = savedTeams.find(x => x.name === game.AwayTeam);
      const gameToSave: IGameCreateDto = {
        homeTeam,
        awayTeam,
        date: moment.utc(game.Date, 'DD/MM/YYYY').toDate(),
        homeTeamGoals: game.FTHG,
        awayTeamGoals: game.FTAG,
      };
      gamesToSave.push(gameToSave);
    }

    return this.gamesRepository.saveGames(gamesToSave);
  }

  public async loadGames() {
    const games = await this.dataApi.loadGames();
    const savedTeams = await this.saveTeams(games);
    const savedGames = await this.saveGames(games, savedTeams);
    return `Saved ${savedGames.length} games`;
  }
}

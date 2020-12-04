import { Injectable } from '@nestjs/common';
import { DataApi } from './data-api/data-api';
import { TeamsRepository } from './database/teams.repository';
import { ITeamCreateDto } from './dto/team/team-create.dto';

@Injectable()
export class AppService {
  constructor(private readonly dataApi: DataApi, private readonly teamsRepository: TeamsRepository) {}

  public async loadGames() {
    const games = await this.dataApi.loadGames();
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

    return await this.teamsRepository.saveTeams(teamsToSave);
  }
}

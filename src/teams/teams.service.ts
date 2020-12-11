import { Injectable } from '@nestjs/common';
import { TeamsRepository } from '../database/teams.repository';
import { ITeamDto } from '../dto/team/team.dto';
import { ITeamCreateDto } from '../dto/team/team-create.dto';
import { TeamMapper } from './team.mapper';
import { ITeamFiler } from '../dto/team/team.filter';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {
  }

  public async getTeams(filter: ITeamFiler): Promise<ITeamDto[]> {
    const teamModels = await this.teamsRepository.getTeams(filter);
    return teamModels.map(x => {
      return {
        id: x.id,
        name: x.name,
      };
    });
  }

  public async getTeam(id: string): Promise<ITeamDto> {
    const teamModel = await this.teamsRepository.getTeam(id);
    return TeamMapper.ITeamDtoFromTeam(teamModel);
  }

  public async patchTeam(id: string, teamCreateDto: ITeamCreateDto): Promise<ITeamDto> {
    const teamModel = await this.teamsRepository.getTeam(id);
    if (Boolean(teamCreateDto.name)) teamModel.name = teamCreateDto.name;
    await teamModel.save();
    return TeamMapper.ITeamDtoFromTeam(teamModel);
  }

  public deleteTeam(id: string): Promise<number> {
    return this.teamsRepository.deleteTeam(id);
  }

  public async createTeam(teamCreateDto: ITeamCreateDto): Promise<ITeamDto> {
    const team = await this.teamsRepository.createTeam(teamCreateDto);
    return TeamMapper.ITeamDtoFromTeam(team);
  }
}

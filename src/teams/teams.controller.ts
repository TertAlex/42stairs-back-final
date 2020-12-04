import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ITeamDto } from '../dto/team/team.dto';
import { ITeamCreateDto } from '../dto/team/team-create.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  public getTeams(): Promise<ITeamDto[]> {
    return this.teamsService.getTeams();
  }

  @Get(':id')
  public getTeam(@Param() params): Promise<ITeamDto> {
    return this.teamsService.getTeam(params.id);
  }

  @Patch(':id')
  public patchTeam(@Param() params, @Body() teamCreateDto: ITeamCreateDto): Promise<ITeamDto> {
    return this.teamsService.patchTeam(params.id, teamCreateDto);
  }

  @Delete(':id')
  public deleteTeam(@Param() params): Promise<number> {
    return this.teamsService.deleteTeam(params.id);
  }

  @Post()
  public createTeam(@Body() teamCreateDto: ITeamCreateDto): Promise<ITeamDto> {
    return this.teamsService.createTeam(teamCreateDto);
  }
}

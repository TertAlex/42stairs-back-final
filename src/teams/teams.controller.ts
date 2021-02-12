import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ITeamDto } from '../dto/team/team.dto';
import { ITeamCreateDto } from '../dto/team/team-create.dto';
import { ITeamFiler } from '../dto/team/team.filter';
import { ITeamIdDto } from '../dto/team/team-id.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  public getTeams(@Query() query: ITeamFiler): Promise<ITeamDto[]> {
    return this.teamsService.getTeams(query);
  }

  @Get(':id')
  public getTeam(@Param() params: ITeamIdDto): Promise<ITeamDto> {
    return this.teamsService.getTeam(params.id);
  }

  @Patch(':id')
  public patchTeam(@Param() params: ITeamIdDto, @Body() teamCreateDto: ITeamCreateDto): Promise<ITeamDto> {
    return this.teamsService.patchTeam(params.id, teamCreateDto);
  }

  @Delete(':id')
  public deleteTeam(@Param() params: ITeamIdDto): Promise<number> {
    return this.teamsService.deleteTeam(params.id);
  }

  @Post()
  public createTeam(@Body() teamCreateDto: ITeamCreateDto): Promise<ITeamDto> {
    return this.teamsService.createTeam(teamCreateDto);
  }
}

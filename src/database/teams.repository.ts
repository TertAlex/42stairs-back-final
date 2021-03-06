import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Team } from '../models/team';
import { ITeamCreateDto } from '../dto/team/team-create.dto';
import { ITeamFiler } from '../dto/team/team.filter';

@Injectable()
export class TeamsRepository {
  constructor(@Inject('TEAM_MODEL') private teamModel: Model<Team>) {
  }

  public async saveTeams(teams: ITeamCreateDto[]): Promise<Team[]> {
    const entities: Team[] = [];
    for (const team of teams) {
      const entity = await this.createTeam(team);
      entities.push(entity);
    }
    return entities;
  }

  public createTeam(team: ITeamCreateDto) {
    return this.teamModel.findOneAndUpdate(
      { name: team.name },
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false },
    );
  }

  public async getTeams(filter: ITeamFiler) {
    return await this.teamModel.find({ name: { $regex: filter?.nameSearch ?? '', $options: 'i' } }).exec();
  }

  public async getTeam(id: string): Promise<Team> {
    let team: Team;
    try {
      team = await this.teamModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    if (!Boolean(team)) throw new NotFoundException(`Team with id ${id} not found`);

    return team;
  }

  public async deleteTeam(id: string): Promise<number> {
    const result = await this.teamModel.deleteOne({ _id: id }).exec();
    return result.deletedCount;
  }
}

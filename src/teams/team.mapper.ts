import { ITeamDto } from '../dto/team/team.dto';
import { Team } from '../models/team';

export class TeamMapper {
  public static ITeamDtoFromTeam(team: Team): ITeamDto {
    return {
      id: team.id,
      name: team.name,
    };
  }
}

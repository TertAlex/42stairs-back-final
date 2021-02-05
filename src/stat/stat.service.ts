import { Injectable } from '@nestjs/common';
import { IResultsFilter } from '../dto/stat/results.filter';
import { GamesRepository } from '../database/games.repository';
import { IResultsResponse } from '../dto/stat/results.response';
import { IWinRationResponse } from '../dto/stat/win-ration.response';
import { IPivotResponse, IPivotTeam } from '../dto/stat/pivot.response';
import { TeamsRepository } from '../database/teams.repository';
import { Game } from '../models/game';

@Injectable()
export class StatService {
  constructor(private readonly gamesRepository: GamesRepository, private readonly teamsRepository: TeamsRepository) {}

  public async getResults(query: IResultsFilter): Promise<IResultsResponse> {
    const games = await this.gamesRepository.getGames({ teamId: query.teamId });

    return {
      winsCount: this.countWins(games, query.teamId),
      losesCount: this.countLoses(games, query.teamId),
      drawsCount: this.countDraws(games, query.teamId),
      scoredCount: this.countScored(games, query.teamId),
      concededCount: this.countConceded(games, query.teamId),
    };
  }

  public async getWinRatio(query: IResultsFilter): Promise<IWinRationResponse> {
    const games = await this.gamesRepository.getGames({ teamId: query.teamId });

    const winsCount = this.countWins(games, query.teamId);
    const losesCount = this.countLoses(games, query.teamId);
    const gamesCount = games.length;

    return {
      winRatio: winsCount / gamesCount,
      loseRation: losesCount / gamesCount,
    };
  }

  public async getPivot(): Promise<IPivotResponse> {
    const teams = await this.teamsRepository.getTeams({});
    const games = await this.gamesRepository.getGames({});

    const data: IPivotTeam[] = teams.map(team => {
      return {
        id: team.id,
        name: team.name,
        gamesCount: this.countGames(games, team.id),
        scores: this.countScores(games, team.id),
        winsCount: this.countWins(games, team.id),
        losesCount: this.countLoses(games, team.id),
        drawsCount: this.countDraws(games, team.id),
        scoredCount: this.countScored(games, team.id),
        concededCount: this.countConceded(games, team.id),
      };
    });

    data.sort((a, b) => (a.scores < b.scores ? 1 : -1));
    return { data };
  }

  private countGames(games: Game[], teamId: any): number {
    return games.filter(x => x.homeTeamId == teamId || x.awayTeamId == teamId).length;
  }

  private countScores(games: Game[], teamId: any): number {
    return (
      games.filter(x => (x.homeTeamId == teamId || x.awayTeamId == teamId) && x.homeTeamGoals === x.awayTeamGoals)
        .length +
      games.filter(
        x =>
          (x.homeTeamId == teamId && x.homeTeamGoals > x.awayTeamGoals) ||
          (x.awayTeamId == teamId && x.awayTeamGoals > x.homeTeamGoals),
      ).length *
        3
    );
  }

  private countWins(games: Game[], teamId: any): number {
    return games.filter(
      x =>
        (x.homeTeamId == teamId && x.homeTeamGoals > x.awayTeamGoals) ||
        (x.awayTeamId == teamId && x.awayTeamGoals > x.homeTeamGoals),
    ).length;
  }

  private countLoses(games: Game[], teamId: any): number {
    return games.filter(
      x =>
        (x.homeTeamId == teamId && x.homeTeamGoals < x.awayTeamGoals) ||
        (x.awayTeamId == teamId && x.awayTeamGoals < x.homeTeamGoals),
    ).length;
  }

  private countDraws(games: Game[], teamId: any): number {
    return games.filter(x => (x.homeTeamId == teamId || x.awayTeamId == teamId) && x.homeTeamGoals === x.awayTeamGoals)
      .length;
  }

  private countScored(games: Game[], teamId: any): number {
    return (
      games.filter(x => x.homeTeamId == teamId).reduce((sum, current) => sum + current.homeTeamGoals, 0) +
      games.filter(x => x.awayTeamId == teamId).reduce((sum, current) => sum + current.awayTeamGoals, 0)
    );
  }

  private countConceded(games: Game[], teamId: any): number {
    return (
      games.filter(x => x.homeTeamId == teamId).reduce((sum, current) => sum + current.awayTeamGoals, 0) +
      games.filter(x => x.awayTeamId == teamId).reduce((sum, current) => sum + current.homeTeamGoals, 0)
    );
  }
}

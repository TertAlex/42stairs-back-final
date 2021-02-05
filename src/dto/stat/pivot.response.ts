export interface IPivotResponse {
  data: IPivotTeam[];
}

export interface IPivotTeam {
  id: any;
  name: string;
  gamesCount: number;
  scores: number;
  winsCount: number;
  losesCount: number;
  drawsCount: number;
  scoredCount: number;
  concededCount: number;
}

import IMatchSummary from "../models/player/IMatchSummary";
import IRankStats from "../models/player/IRankScore";
import IUggMatchSummary from "../models/ugg/IUggMatchSummary";
import IUggRankScore from "../models/ugg/IUggRankScore";

export const FETCH_MATCH_SUMMARIES_QUERY = `query FetchMatchSummaries(
    $championId: [Int],
    $page: Int,
    $queueType: [Int],
    $regionId: String!,
    $role: [Int],
    $seasonIds: [Int]!,
    $summonerName: String!
  ) {
    fetchPlayerMatchSummaries(
        championId: $championId
        page: $page
        queueType: $queueType
        regionId: $regionId
        role: $role
        seasonIds: $seasonIds
        summonerName: $summonerName
    ) {
        finishedMatchSummaries
        totalNumMatches
        matchSummaries {
          assists
          championId
          deaths
          killParticipation
          kills
          matchCreationTime
          matchDuration
          matchId
          summonerName
          psHardCarry
          psTeamPlay
          win
          role
          queueType
        }
    }
  }`;

export interface IMatchSummariesQueryResponse {
    finishedMatchSummaries: boolean;
    totalNumMatches: number;
    matchSummaries: IUggMatchSummary[];
}

export const FETCH_PROFILE_RANKS_QUERY = `query FetchProfileRanks(
    $summonerName: String!,
    $regionId: String!,
    $seasonId: Int!
  ) {
    fetchProfileRanks(
      summonerName: $summonerName
      regionId: $regionId
      seasonId: $seasonId
    ) {
        rankScores {
            losses
            queueType
            rank
            tier
            wins
        }
    }
  }`;

export interface IFetchProfileRanksQueryResponse {
    rankScores: IUggRankScore[];
}

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

export const GET_SUMMONER_PROFILE = `query getSummonerProfile($championId: String!, $queueType: String!, $regionId: String!, $role: String!, $seasonId: String!, $summonerName: String!) {
    profileInit(
      championId: $championId
      queueType: $queueType
      regionId: $regionId
      role: $role
      seasonId: $seasonId
      summonerName: $summonerName
    ) {
      finishedMatchHistory
      lastModified
      matchHistory {
        assists
        championId
        cs
        deaths
        gold
        items
        jungleCs
        kills
        level
        matchCreationTime
        matchDuration
        matchId
        maximumKillStreak
        primaryStyle
        queueType
        regionId
        runes
        role
        subStyle
        summonerName
        summonerSpells
        version
        win
        teamA {
          championId
          summonerName
          __typename
        }
        teamB {
          championId
          summonerName
          __typename
        }
        visionScore
        killParticipation
        __typename
      }
      playerInfo {
        accountIdV3
        accountIdV4
        exodiaUuid
        iconId
        puuidV4
        regionId
        summonerIdV3
        summonerIdV4
        summonerLevel
        summonerName
        __typename
      }
      playerOverviewKpis {
        gameStreak
        maxKills
        totalAssists
        totalCs
        totalDeaths
        totalGames
        totalKills
        totalSeconds
        totalWins
        __typename
      }
      playerRank {
        exodiaUuid
        rankScores {
          losses
          lp
          promoProgress
          queueType
          role
          seasonId
          tier
          wins
          rank
          lastUpdatedAt
          __typename
        }
        __typename
      }
      playerStatistics {
        basicChampionPerformances {
          assists
          championId
          cs
          damage
          damageTaken
          deaths
          doubleKills
          gold
          kills
          maxDeaths
          maxKills
          pentaKills
          quadraKills
          totalMatches
          tripleKills
          wins
        }
        exodiaUuid
        puuid
        queueType
        regionId
        role
        seasonId
      }
      totalNumMatches
    }
  }`;

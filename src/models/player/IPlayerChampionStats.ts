import getPerformance from "../../lib/performance";
import IMatchSummary from "./IMatchSummary";
import IPlayerData from "./IPlayerData";

export default interface IPlayerChampionStats {
    championId: number;
    wins: number;
    games: number;
    pickrate: number;

    kills: number;
    assists: number;
    deaths: number;

    psHardCarry: number;
    psTeamPlay: number;
    performance: number;
}

export function createPlayerChampionStats(
    championId: number,
    matchSummaries: IMatchSummary[],
    totalGames: number
): IPlayerChampionStats {
    let wins = 0;
    let losses = 0;
    let kills = 0;
    let assists = 0;
    let deaths = 0;
    let psHardCarry = 0;
    let psTeamPlay = 0;

    const n = matchSummaries.length;
    for (const match of matchSummaries) {
        if (match.win) {
            wins++;
        } else {
            losses++;
        }

        kills += match.kills / n;
        assists += match.assists / n;
        deaths += match.deaths / n;
        psHardCarry += match.psHardCarry / n;
        psTeamPlay += match.psTeamPlay / n;
    }

    const performance = getPerformance(wins, wins + losses);

    return {
        championId,
        wins,
        games: wins + losses,
        pickrate: (wins + losses) / totalGames,

        kills,
        assists,
        deaths,

        psHardCarry,
        psTeamPlay,
        performance,
    };
}

export function getPlayerChampionStats(matchSummaries: IMatchSummary[]) {
    const matchesByChampion = new Map<number, IMatchSummary[]>();
    for (const match of matchSummaries) {
        if (matchesByChampion.has(match.championId)) {
            matchesByChampion.get(match.championId)!.push(match);
        } else {
            matchesByChampion.set(match.championId, [match]);
        }
    }

    const championStats: Record<number, IPlayerChampionStats> = {};
    for (const [championId, matches] of matchesByChampion.entries()) {
        championStats[championId] = createPlayerChampionStats(
            championId,
            matches,
            matchSummaries.length
        );
    }

    return championStats;
}

export function getPlayerChampionStatsKda(stats: IPlayerChampionStats) {
    return (stats.kills + stats.assists) / stats.deaths;
}

export function getPlayerChampionStatsByPerformance(
    playerData: IPlayerData
): IPlayerChampionStats[] {
    return Object.values(playerData.championStats).sort(
        (a, b) => b.performance - a.performance
    );
}

import IPlayerChampionStats, {
    getPlayerChampionStats as createPlayerChampionStats,
} from "./IPlayerChampionStats";
import IMatchSummary from "./IMatchSummary";
import IRankStats from "./IRankScore";
import IRoleStats, { createRoleStats } from "./IRoleStats";

export default interface IPlayerData {
    summonerName: string;
    regionId: string;
    rankStats: Record<number, IRankStats>;

    wins: number;
    games: number;

    championStats: Record<number, IPlayerChampionStats>;
    roleStats: Record<number, IRoleStats>;

    matchSummaries: IMatchSummary[];
}

export function createPlayerData(
    summonerName: string,
    regionId: string,
    matchSummaries: IMatchSummary[],
    rankScores: IRankStats[]
): IPlayerData {
    let wins = 0;
    let losses = 0;
    for (const match of matchSummaries) {
        if (match.win) {
            wins++;
        } else {
            losses++;
        }
    }

    return {
        summonerName,
        regionId,
        wins,
        games: matchSummaries.length,
        matchSummaries,
        rankStats: rankScores,
        championStats: createPlayerChampionStats(matchSummaries),
        roleStats: createRoleStats(matchSummaries),
    };
}

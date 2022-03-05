import getPerformance from "../../lib/performance";
import IMatchSummary from "./IMatchSummary";
import IPlayerData from "./IPlayerData";
import Role from "../Role";

export default interface IRoleStats {
    role: Role;
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

export function createRoleStat(
    role: Role,
    matchSummaries: IMatchSummary[],
    totalGames: number
): IRoleStats {
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
        role,
        wins,
        games: n,
        pickrate: n / totalGames,

        kills,
        assists,
        deaths,

        psHardCarry,
        psTeamPlay,
        performance,
    };
}

export function createRoleStats(matchSummaries: IMatchSummary[]) {
    const totalGames = matchSummaries.length;

    const matchesByRole = new Map<Role, IMatchSummary[]>();
    for (const match of matchSummaries) {
        if (matchesByRole.has(match.role)) {
            matchesByRole.get(match.role)!.push(match);
        } else {
            matchesByRole.set(match.role, [match]);
        }
    }

    const roleStats: Record<number, IRoleStats> = {};
    for (const [role, matches] of matchesByRole.entries()) {
        roleStats[role] = createRoleStat(role, matches, totalGames);
    }

    return roleStats;
}

export function getRoleStatsByPickrate(
    playerData: IPlayerData
): [Role, number][] {
    return Object.entries(playerData.roleStats)
        .map(
            ([role, stats]) =>
                [parseFloat(role), stats.pickrate] as [Role, number]
        )
        .sort(([_A, prA], [_B, prB]) => prA - prB);
}

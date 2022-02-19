import IRiotChampion from "../riot/IRiotChampion";
import { fromRoleString } from "../Role";
import IUggChampionRankingData from "../ugg/IUggChampionRankingData";
import IStaticChampionData from "./IStaticChampionData";

export interface IStaticDataset {
    championStats: Record<number, IStaticChampionData>;
    patch: string;
}

export function createStaticDataset(
    patch: string,
    championData: IRiotChampion[],
    rankingData: IUggChampionRankingData[]
): IStaticDataset {
    const championStats: Record<number, IStaticChampionData> = {};

    const rankingDataByChampion = new Map<number, IUggChampionRankingData[]>();
    for (const ranking of rankingData) {
        if (rankingDataByChampion.has(ranking.championId)) {
            rankingDataByChampion.get(ranking.championId)!.push(ranking);
        } else {
            rankingDataByChampion.set(ranking.championId, [ranking]);
        }
    }

    for (const champion of championData) {
        const id = parseFloat(champion.key);
        const rankingData = rankingDataByChampion.get(id)!;

        championStats[id] = {
            championId: id,
            name: champion.name,
            riotId: champion.id,

            wins: rankingData.reduce((sum, x) => sum + x.wins, 0),
            matches: rankingData.reduce((sum, x) => sum + x.matches, 0),

            roleStats: Object.fromEntries(
                rankingData.map((r) => [
                    fromRoleString(r.role),
                    {
                        role: fromRoleString(r.role),
                        wins: r.wins,
                        matches: r.matches,
                        counters: r.counters.map((c) => ({
                            championId: c[0],
                            wins: c[1],
                            matches: c[2],
                        })),
                    },
                ])
            ),
        };
    }

    return {
        championStats,
        patch,
    };
}

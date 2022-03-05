import QueueType, { fromUggQueueType } from "../QueueType";
import IUggRankScore from "../ugg/IUggRankScore";

export default interface IRankStats {
    queueType: QueueType;
    tier: string;
    rank: string;
    games: number;
    wins: number;
}

export function fromUggRankScore(ugg: IUggRankScore): IRankStats {
    const queueType = ugg.queueType || "ranked_flex_sr";

    return {
        queueType: fromUggQueueType(queueType),
        tier: ugg.tier,
        rank: ugg.rank,
        wins: ugg.wins,
        games: ugg.wins + ugg.losses,
    };
}

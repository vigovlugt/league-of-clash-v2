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
    return {
        queueType: fromUggQueueType(ugg.queueType),
        tier: ugg.tier,
        rank: ugg.rank,
        wins: ugg.wins,
        games: ugg.wins + ugg.losses,
    };
}

import QueueType, { fromUggQueueType } from "../QueueType";
import Role from "../Role";
import IUggMatchSummary from "../ugg/IUggMatchSummary";

export default interface IMatchSummary {
    id: number;
    championId: number;
    queueType: QueueType;
    summonerName: string;
    role: Role;

    win: true;

    kills: number;
    assists: number;
    deaths: number;
    killParticipation: number;

    createdAt: number;
    duration: number;

    psHardCarry: number;
    psTeamPlay: number;
}

export function fromUggMatchSummary(ugg: IUggMatchSummary): IMatchSummary {
    return {
        id: ugg.matchId,
        championId: ugg.championId,
        queueType: fromUggQueueType(ugg.queueType),
        summonerName: ugg.summonerName,
        role: ugg.role,

        win: ugg.win,

        kills: ugg.kills,
        assists: ugg.assists,
        deaths: ugg.deaths,
        killParticipation: ugg.killParticipation,

        createdAt: ugg.matchCreationTime,
        duration: ugg.matchDuration,

        psHardCarry: ugg.psHardCarry,
        psTeamPlay: ugg.psTeamPlay,
    };
}

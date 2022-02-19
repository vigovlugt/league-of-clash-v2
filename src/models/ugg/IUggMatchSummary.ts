export default interface IUggMatchSummary {
    matchId: number;
    championId: number;
    queueType: string;
    summonerName: string;
    role: number;

    win: true;

    kills: number;
    assists: number;
    deaths: number;
    killParticipation: number;

    matchCreationTime: number;
    matchDuration: number;

    psHardCarry: number;
    psTeamPlay: number;
}

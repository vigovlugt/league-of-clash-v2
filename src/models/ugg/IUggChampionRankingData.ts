export default interface IUggChampionRankingData {
    role: string;
    championId: number;
    wins: number;
    matches: number;
    counters: [number, number, number][];
}

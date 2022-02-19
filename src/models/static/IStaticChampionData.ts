import { IStaticChampionRoleStats } from "./IStaticChampionRoleStats";

export default interface IStaticChampionData {
    championId: number;
    riotId: string;
    name: string;

    wins: number;
    matches: number;

    roleStats: Record<number, IStaticChampionRoleStats>;
}

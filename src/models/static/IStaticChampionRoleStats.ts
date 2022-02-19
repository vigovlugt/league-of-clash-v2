import Role from "../Role";

export interface IStaticChampionRoleStats {
    role: Role;
    wins: number;
    matches: number;
    counters: Record<number, IStaticChampionRoleCounterStats>;
}

export interface IStaticChampionRoleCounterStats {
    championId: number;
    wins: number;
    matches: number;
}

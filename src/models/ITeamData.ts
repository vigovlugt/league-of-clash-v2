import IPlayerData from "./IPlayerData";

export default interface ITeamData {
    playerData: IPlayerData[];
}

export function createTeamData(playerData: IPlayerData[]) {
    return {
        playerData,
    };
}

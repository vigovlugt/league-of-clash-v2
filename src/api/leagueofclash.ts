import ITeamData, { createTeamData } from "../models/ITeamData";
import IPlayerData from "../models/player/IPlayerData";

export default class LeagueOfClash {
    static async getTeamData(
        regionId: string,
        seasonId: number,
        summonerNames: string[]
    ): Promise<ITeamData> {
        const promises = summonerNames.map((name) =>
            LeagueOfClash.getPlayerData(name, regionId, seasonId)
        );

        const data = await Promise.all(promises);

        return createTeamData(data);
    }

    static async getPlayerData(
        summonerName: string,
        regionId: string,
        seasonId: number
    ): Promise<IPlayerData> {
        const query = {
            summonerName,
            regionId,
            seasonId,
        };
        const queryString = Object.entries(query)
            .reduce(
                (arr: string[], [key, value]) => [...arr, `${key}=${value}`],
                []
            )
            .join("&");

        const res = await fetch("/api/playerData?" + queryString);

        const json = await res.json();

        return json;
    }
}

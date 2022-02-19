import IRiotChampion from "../models/riot/IRiotChampion";

const BASE_URL = "http://ddragon.leagueoflegends.com/";

export default class RiotApi {
    static async getChampionData(patch: string): Promise<IRiotChampion[]> {
        const url = `${BASE_URL}cdn/${patch}.1/data/en_US/champion.json`;

        const res = await fetch(url);
        const json = await res.json();

        return Object.values<IRiotChampion>(json.data);
    }
}

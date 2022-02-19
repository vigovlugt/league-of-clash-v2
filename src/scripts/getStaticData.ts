import UggApi from "../api/UggApi";
import fetch from "node-fetch";
import RiotApi from "../api/RiotApi";
import { createStaticDataset } from "../models/static/IStaticDataset";
import * as fs from "fs/promises";

(global as any).fetch = fetch;

async function main() {
    const version = await UggApi.getUggVersion();
    console.log("Version:", version);

    const riotData = await RiotApi.getChampionData(version);
    console.log(`Champions: ${riotData.length}`);

    const rankingData = await UggApi.getChampionRankingData(version);

    const staticDataset = createStaticDataset(version, riotData, rankingData);

    await fs.writeFile(
        "./public/static/dataset.json",
        JSON.stringify(staticDataset)
    );
}

main();

import type { NextApiRequest, NextApiResponse } from "next";
import UggApi from "../../api/UggApi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const summonerName = req.query.summonerName?.toString();
    const regionId = req.query.regionId?.toString() ?? "euw1";
    const seasonId =
        req.query.seasonId != null
            ? parseFloat(req.query.seasonId.toString())
            : 18;

    if (!summonerName || !regionId || !seasonId) {
        res.status(400).json({
            error: "summonerName, regionId or seasonId not defined",
        });
    }

    const uggPlayerData = await UggApi.getPlayerData(
        summonerName,
        regionId,
        seasonId
    );

    res.status(200).json(uggPlayerData);
};

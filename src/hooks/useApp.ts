import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LeagueOfClash from "../api/leagueofclash";
import { IStaticDataset } from "../models/static/IStaticDataset";
import {
    setAllyData,
    setEnemyData,
    setStaticDataset,
} from "../store/slices/appSlice";

export const useAppInit = (staticDataset: IStaticDataset) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(setStaticDataset(staticDataset));
    }, [staticDataset]);

    useEffect(() => {
        const effect = async () => {
            const query = router.query;
            const allyTeamNames =
                decodeURIComponent(query.allyTeam?.toString() ?? "").split(
                    " "
                ) ?? [];

            const enemyTeamNames =
                decodeURIComponent(query.enemyTeam?.toString() ?? "").split(
                    " "
                ) ?? [];

            const regionId = query.regionId?.toString() ?? "euw1";
            const seasonId = parseFloat(query.seasonId?.toString() ?? "18");

            if (!regionId || !seasonId) {
                setError("No region or season defined in query.");
            }

            if (!allyTeamNames.length || !enemyTeamNames.length) {
                setError("No enemy or ally team defined in query.");
            }

            const allyDataPromise = LeagueOfClash.getTeamData(
                regionId,
                seasonId,
                allyTeamNames
            );

            const enemyDataPromise = LeagueOfClash.getTeamData(
                regionId,
                seasonId,
                enemyTeamNames
            );

            const [allyData, enemyData] = await Promise.all([
                allyDataPromise,
                enemyDataPromise,
            ]);

            dispatch(setAllyData(allyData));
            dispatch(setEnemyData(enemyData));
        };

        if (router.isReady) {
            effect();
        }
    }, [typeof window, router.isReady]);

    return error;
};

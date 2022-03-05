import { fromUggMatchSummary } from "../models/player/IMatchSummary";
import { createPlayerData } from "../models/player/IPlayerData";
import { fromUggRankScore } from "../models/player/IRankScore";
import IUggChampionRankingData from "../models/ugg/IUggChampionRankingData";
import IUggMatchSummary from "../models/ugg/IUggMatchSummary";
import {
    FETCH_MATCH_SUMMARIES_QUERY,
    FETCH_PROFILE_RANKS_QUERY,
    GET_SUMMONER_PROFILE,
    IFetchProfileRanksQueryResponse,
    IGetSummonerProfileResponse,
    IMatchSummariesQueryResponse,
} from "./queries";

const BASE_URL = "https://u.gg/api";

export default class UggApi {
    static async getPlayerData(
        summonerName: string,
        regionId: string,
        seasonId: number
    ) {
        const matchSummariesPromise = UggApi.getMatchSummaries(
            summonerName,
            regionId,
            seasonId
        );

        const playerRanksPromise = UggApi.getPlayerRanks(
            summonerName,
            regionId,
            seasonId
        );

        const summonerProfilePromise = UggApi.getSummonerProfile(
            regionId,
            summonerName
        );

        const [matchSummaries, playerRanks, summonerProfile] =
            await Promise.all([
                matchSummariesPromise,
                playerRanksPromise,
                summonerProfilePromise,
            ]);

        return createPlayerData(
            regionId,
            summonerProfile,
            matchSummaries.map((ugg) => fromUggMatchSummary(ugg)),
            playerRanks.map((ugg) => fromUggRankScore(ugg))
        );
    }

    static async getMatchSummaries(
        summonerName: string,
        regionId: string,
        seasonId: number
    ) {
        let matchSummaries: IUggMatchSummary[] = [];
        let currentPage = 1;

        let lastReponse = await this.getMatchSummaryPage(
            summonerName,
            regionId,
            seasonId,
            currentPage
        );
        currentPage++;
        matchSummaries = [...matchSummaries, ...lastReponse.matchSummaries];

        while (!lastReponse.finishedMatchSummaries) {
            lastReponse = await this.getMatchSummaryPage(
                summonerName,
                regionId,
                seasonId,
                currentPage
            );
            currentPage++;

            matchSummaries = [...matchSummaries, ...lastReponse.matchSummaries];
        }

        return matchSummaries;
    }

    private static async getMatchSummaryPage(
        summonerName: string,
        regionId: string,
        seasonId: number,
        page: number = 1
    ) {
        const body = {
            query: FETCH_MATCH_SUMMARIES_QUERY,
            variables: {
                championId: [],
                queueType: [420, 440],
                role: [],
                seasonIds: [seasonId],
                summonerName,
                regionId,
                page,
            },
        };

        const res = await fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        });

        const json = await res.json();
        if (json.errors?.length) {
            console.error(json);
            console.error("Error for '" + summonerName + "'");
        }

        return json.data
            .fetchPlayerMatchSummaries as IMatchSummariesQueryResponse;
    }

    static async getPlayerRanks(
        summonerName: string,
        regionId: string,
        seasonId: number
    ) {
        const body = {
            query: FETCH_PROFILE_RANKS_QUERY,
            variables: {
                summonerName,
                regionId,
                seasonId,
            },
        };

        const res = await fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        });

        const json = await res.json();

        const fetchProfileRanks = json.data
            .fetchProfileRanks as IFetchProfileRanksQueryResponse;

        return fetchProfileRanks.rankScores;
    }

    static async getSummonerProfile(regionId: string, summonerName: string) {
        const body = {
            query: GET_SUMMONER_PROFILE,
            variables: {
                summonerName,
                regionId,
            },
        };

        const res = await fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        });

        const json = await res.json();

        const data = json.data.profileInit as IGetSummonerProfileResponse;

        return data.playerInfo;
    }

    // STATIC DATA

    static async getUggVersion() {
        const URL =
            "https://static.u.gg/assets/lol/riot_patch_update/prod/ugg/ugg-api-versions.json";

        const res = await fetch(URL);

        const json = await res.json();

        const versions = Object.keys(json).map(
            (str) =>
                str.split("_").map((x) => parseFloat(x)) as [number, number]
        );

        const sorted = versions.sort(this.sortVersionsDesc);

        return sorted[0].join(".");
    }

    private static sortVersionsDesc(a: [number, number], b: [number, number]) {
        if (a[0] !== b[0]) {
            return b[0] - a[0];
        } else {
            return b[1] - a[1];
        }
    }

    static async getChampionRankingData(patch: string) {
        const URL = `https://stats2.u.gg/lol/1.1/champion_ranking/world/${patch
            .split(".")
            .slice(0, 2)
            .join("_")}/ranked_solo_5x5/platinum_plus/1.5.0.json`;

        const res = await fetch(URL);

        const json: any = await res.json();

        const data: IUggChampionRankingData[] = [];

        for (const [role, stats] of Object.entries<any>(json[0])) {
            for (const value of stats) {
                data.push({
                    role,
                    championId: parseFloat(value[0]),
                    wins: value[2],
                    matches: value[3],
                    counters: value[1],
                });
            }
        }

        return data;
    }
}

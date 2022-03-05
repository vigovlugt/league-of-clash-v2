import getPerformance from "../../../lib/performance";
import IPlayerData from "../../../models/player/IPlayerData";
import QueueType from "../../../models/QueueType";
import formatPercentage from "../../../utils/formatting/percentage";
import { getRankClass } from "../../../utils/style/rank";
import { getWinrateClass } from "../../../utils/style/winrate";
import PlayerIcon from "./PlayerIcon";

interface IProps {
    playerData: IPlayerData;
}

const PlayerStatsHeader: React.FC<IProps> = ({ playerData }) => {
    const performance = getPerformance(
        playerData.wins,
        playerData.games,
        false
    );

    return (
        <div className="rounded-lg bg-dark p-8">
            <div className="flex">
                <PlayerIcon iconId={playerData.iconId} size="xl" rounded />
                <div className="ml-4">
                    <h2 className="mb-1 font-header text-4xl">
                        {playerData.summonerName}
                    </h2>
                    <span
                        className={`font-header text-2xl ${getRankClass(
                            playerData.rankStats[QueueType.RankedSolo].tier
                        )}`}
                    >
                        {playerData.rankStats[QueueType.RankedSolo].tier}{" "}
                        {playerData.rankStats[QueueType.RankedSolo].rank ?? ""}
                    </span>
                </div>
                <div className="ml-auto">
                    <a
                        href={`https://u.gg/lol/profile/${playerData.regionId}/${playerData.summonerName}/overview`}
                        target="_blank"
                    >
                        U.GG
                    </a>
                </div>
            </div>
            <div className="-m-8 mt-8 flex rounded-b-lg bg-darker/30 text-lg">
                <div className="align-center flex w-full justify-center p-6">
                    <span
                        className={getWinrateClass(
                            playerData.wins,
                            playerData.games
                        )}
                    >
                        {formatPercentage(playerData.wins, playerData.games)}{" "}
                    </span>

                    <span className="text-gray-300">Winrate</span>
                </div>
                <div className="align-center flex w-full justify-center border-l-2 border-darker p-6">
                    {playerData.games}{" "}
                    <span className="text-gray-300">Games</span>
                </div>
                <div className="align-center flex w-full justify-center border-l-2 border-darker p-6">
                    <span className={getWinrateClass(performance)}>
                        {formatPercentage(performance)}{" "}
                    </span>

                    <span className="text-gray-300">Performance</span>
                </div>
                {/* <div className="align-center flex w-full justify-center border-l-2 border-darker p-6">
                    <span
                        className={getWinrateClass(
                            playerData.rankStats[QueueType.RankedFlex].wins,
                            playerData.rankStats[QueueType.RankedFlex].games
                        )}
                    >
                        {formatPercentage(
                            playerData.rankStats[QueueType.RankedFlex].wins,
                            playerData.rankStats[QueueType.RankedFlex].games
                        )}{" "}
                    </span>

                    <span className="text-gray-300">Winrate (FLEX)</span>
                </div>
                <div className="align-center flex w-full justify-center border-l-2 border-darker p-6">
                    {playerData.rankStats[QueueType.RankedFlex].games}{" "}
                    <span className="text-gray-300">Games (FLEX)</span>
                </div> */}
            </div>
        </div>
    );
};

export default PlayerStatsHeader;

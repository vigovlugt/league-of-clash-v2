import IPlayerData from "../../../models/player/IPlayerData";
import PlayerChampionStat from "./PlayerChampionStat";
import PlayerChampionStats from "./PlayerChampionStats";
import PlayerStatsHeader from "./PlayerStatsHeader";

interface IProps {
    playerData: IPlayerData;
}

const PlayerDataView: React.FC<IProps> = ({ playerData }) => {
    return (
        <div>
            <PlayerStatsHeader playerData={playerData} />
            <div className="mb-8" />
            <h2 className="mb-2 font-header text-4xl">Champion stats</h2>
            <PlayerChampionStats
                championStats={Object.values(playerData.championStats)}
            />
        </div>
    );
};

export default PlayerDataView;

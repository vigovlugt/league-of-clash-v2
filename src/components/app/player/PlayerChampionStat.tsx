import IPlayerChampionStats, {
    getPlayerChampionStatsKda,
} from "../../../models/player/IPlayerChampionStats";

interface IProps {
    championStats: IPlayerChampionStats;
}

const PlayerChampionStat: React.FC<IProps> = ({ championStats }) => {
    return (
        <tr>
            <td className={`whitespace-nowrap px-6 py-4`}>
                <div className="flex items-center">
                    {championStats.championId}
                </div>
            </td>
            <td className={`whitespace-nowrap px-6 py-4 text-right`}>{1}</td>
            <td className={`whitespace-nowrap px-6 py-4 text-right`}>
                {championStats.games}
            </td>
            <td className={`whitespace-nowrap px-6 py-4 text-right`}>
                {getPlayerChampionStatsKda(championStats)}
            </td>
            <td className={`whitespace-nowrap px-6 py-4 text-right`}>{1}</td>
            <td className={`text-px-6 whitespace-nowrap py-4 text-primary`}>
                {(championStats.performance * 100).toFixed(2)}
            </td>
        </tr>
    );
};

export default PlayerChampionStat;

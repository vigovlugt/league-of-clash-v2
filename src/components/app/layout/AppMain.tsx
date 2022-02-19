import { useAppSelector } from "../../../hooks/store";
import {
    selectAllyData,
    selectEnemyData,
    selectStaticDataset,
} from "../../../store/slices/appSlice";
import PlayerChampionStats from "../player/PlayerChampionStats";

const AppMain: React.FC = () => {
    const allyData = useAppSelector(selectAllyData);
    const enemyData = useAppSelector(selectEnemyData);
    const staticDataset = useAppSelector(selectStaticDataset);

    return (
        <div
            style={{ gridArea: "main" }}
            className="overflow-y-scroll whitespace-pre-wrap p-4"
        >
            <PlayerChampionStats
                championStats={allyData?.playerData[0].championStats}
            />
            {JSON.stringify(allyData, null, 4)}
            {JSON.stringify(staticDataset, null, 4)}
        </div>
    );
};

export default AppMain;

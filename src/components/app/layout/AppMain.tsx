import { useAppSelector } from "../../../hooks/store";
import {
    selectAllyData,
    selectEnemyData,
    selectStaticDataset,
} from "../../../store/slices/appSlice";
import PlayerChampionStats from "../player/PlayerChampionStats";
import PlayerDataView from "../player/PlayerDataView";

const AppMain: React.FC = () => {
    const allyData = useAppSelector(selectAllyData);
    const enemyData = useAppSelector(selectEnemyData);
    const staticDataset = useAppSelector(selectStaticDataset);

    return (
        <div
            style={{ gridArea: "main" }}
            className="overflow-y-auto whitespace-pre-wrap p-4"
        >
            <PlayerDataView playerData={allyData?.playerData[0]} />
        </div>
    );
};

export default AppMain;

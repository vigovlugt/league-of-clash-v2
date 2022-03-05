import { useAppSelector } from "../../../hooks/store";
import {
    selectAllyData,
    selectEnemyData,
    selectStaticDataset,
} from "../../../store/slices/appSlice";
import { selectCurrentTab } from "../../../store/slices/viewSlice";
import PlayerDataView from "../player/PlayerDataView";

const AppMain: React.FC = () => {
    const currentTab = useAppSelector(selectCurrentTab);

    const allyData = useAppSelector(selectAllyData);
    const enemyData = useAppSelector(selectEnemyData);
    const staticDataset = useAppSelector(selectStaticDataset);

    const currentPlayer = currentTab
        ? [
              ...(allyData?.playerData ?? []),
              ...(enemyData?.playerData ?? []),
          ].find((p) => p.summonerName === currentTab)
        : undefined;

    return (
        <div
            style={{ gridArea: "main" }}
            className="overflow-y-auto whitespace-pre-wrap p-4"
        >
            {currentPlayer && <PlayerDataView playerData={currentPlayer} />}
        </div>
    );
};

export default AppMain;

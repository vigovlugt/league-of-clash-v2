import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/store";
import IPlayerData from "../../../models/player/IPlayerData";
import {
    selectAllyData,
    selectEnemyData,
} from "../../../store/slices/appSlice";
import {
    selectCurrentTab,
    setCurrentTab,
} from "../../../store/slices/viewSlice";
import Tab from "../../common/Tab";

const AppHeader: React.FC = () => {
    const allyData = useAppSelector(selectAllyData);
    const enemyData = useAppSelector(selectEnemyData);

    const currentTab = useAppSelector(selectCurrentTab);

    const dispatch = useDispatch();

    const setTab = (summoner?: string) => {
        dispatch(setCurrentTab(summoner));
    };

    return (
        <header
            style={{ gridArea: "head" }}
            className="flex items-center justify-between bg-dark px-[316px] text-primary shadow-lg"
        >
            <div>
                {allyData?.playerData.map((p: IPlayerData) => (
                    <Tab
                        isActive={currentTab === p.summonerName}
                        key={p.summonerName}
                        onClick={() => setTab(p.summonerName)}
                    >
                        {p.summonerName}
                    </Tab>
                ))}
            </div>
            <div>
                <Tab
                    isActive={currentTab === undefined}
                    onClick={() => setTab(undefined)}
                >
                    Overview
                </Tab>
            </div>
            <div>
                {enemyData?.playerData.map((p) => (
                    <Tab
                        isActive={currentTab === p.summonerName}
                        key={p.summonerName}
                        onClick={() => setTab(p.summonerName)}
                    >
                        {p.summonerName}
                    </Tab>
                ))}
            </div>
        </header>
    );
};

export default AppHeader;

import { useAppInit } from "../hooks/useApp";
import { useAppSelector } from "../hooks/store";
import { selectAllyData, selectEnemyData } from "../store/slices/appSlice";
import AppHeader from "../components/app/layout/AppHeader";
import AppFooter from "../components/app/layout/AppFooter";
import AppSide from "../components/app/layout/AppSide";
import AppMain from "../components/app/layout/AppMain";
import * as fs from "fs/promises";
import { IStaticDataset } from "../models/static/IStaticDataset";

interface IProps {
    staticDataset: IStaticDataset;
}

const App: React.FC<IProps> = ({ staticDataset }) => {
    const allyData = useAppSelector(selectAllyData);
    const enemyData = useAppSelector(selectEnemyData);

    const error = useAppInit(staticDataset);

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!allyData || !enemyData) {
        return <h1>Loading</h1>;
    }

    return (
        <div
            className="grid h-screen bg-darker text-white"
            style={{
                gridTemplate: `"head head head" 50px \n"main-left main main-right"\n"footer footer footer" 50px / 300px auto 300px`,
            }}
        >
            <AppHeader />
            <AppSide right={false} />
            <AppMain />
            <AppSide right={true} />

            <AppFooter />
        </div>
    );
};

export async function getStaticProps() {
    const staticDataset: IStaticDataset = JSON.parse(
        await (await fs.readFile("./public/static/dataset.json")).toString()
    );

    return {
        props: { staticDataset },
    };
}

export default App;

import { useAppSelector } from "../../../hooks/store";
import { selectStaticDataset } from "../../../store/slices/appSlice";

interface IProps {
    championId: number;
    size: "sm" | "md";
}

const ChampionIcon: React.FC<IProps> = ({ championId, size }) => {
    const staticDataset = useAppSelector(selectStaticDataset);

    const width = size === "sm" ? 32 : 48;

    const src = `https://ddragon.leagueoflegends.com/cdn/${staticDataset?.patch}.1/img/champion/${staticDataset?.championStats[championId].riotId}.png`;

    return (
        <div
            className="overflow-hidden rounded-lg"
            style={{ width: `${width}px`, height: `${width}px` }}
        >
            <img
                className="h-full w-full scale-110"
                src={src}
                alt={staticDataset?.championStats[championId].name}
            />
        </div>
    );
};

export default ChampionIcon;

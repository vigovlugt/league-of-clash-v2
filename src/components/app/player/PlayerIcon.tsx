import { useAppSelector } from "../../../hooks/store";
import { selectStaticDataset } from "../../../store/slices/appSlice";

interface IProps {
    iconId: number;
    size: "sm" | "md" | "lg" | "xl";
    rounded: boolean;
}

const PlayerIcon: React.FC<IProps> = ({ iconId, size, rounded = false }) => {
    const staticDataset = useAppSelector(selectStaticDataset);

    const width = { sm: 32, md: 48, lg: 64, xl: 96, "2xl": 128 }[size];

    const src = `https://ddragon.leagueoflegends.com/cdn/${staticDataset?.patch}.1/img/profileicon/${iconId}.png`;

    return (
        <div
            className={`overflow-hidden ${
                rounded ? "rounded-full" : "rounded-lg"
            }`}
            style={{ width: `${width}px`, height: `${width}px` }}
        >
            <img className="h-full w-full" src={src} alt="Profile icon" />
        </div>
    );
};

export default PlayerIcon;

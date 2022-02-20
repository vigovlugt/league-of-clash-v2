import IPlayerData from "../../../models/player/IPlayerData";

interface IProps {
    playerData: IPlayerData;
}

const PlayerStatsHeader: React.FC<IProps> = ({ playerData }) => {
    return <div className="rounded-lg bg-dark p-4"></div>;
};

export default PlayerStatsHeader;

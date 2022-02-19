import IPlayerData from "../../../models/IPlayerData";

interface IProps {
    playerData: IPlayerData;
}

const PlayerDataView: React.FC<IProps> = ({ playerData }) => {
    return (
        <div>
            <h3>
                {playerData.summonerName} -{" "}
                {playerData.wins + playerData.losses}
            </h3>
        </div>
    );
};

export default PlayerDataView;

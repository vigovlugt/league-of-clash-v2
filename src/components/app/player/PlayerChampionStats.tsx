import { PropsWithChildren, useMemo } from "react";
import IPlayerChampionStats from "../../../models/player/IPlayerChampionStats";
import Table from "../../common/Table";
import { useTable, Column, Row, CellProps } from "react-table";
import { useAppSelector } from "../../../hooks/store";
import { selectStaticDataset } from "../../../store/slices/appSlice";
import formatPercentage from "../../../utils/formatting/percentage";
import ChampionIcon from "../../common/ChampionIcon";
import { getWinrateClass } from "../../../utils/style/winrate";

interface IProps {
    championStats: IPlayerChampionStats[];
}

const PlayerChampionStats: React.FC<IProps> = ({ championStats }) => {
    const staticDataset = useAppSelector(selectStaticDataset);

    const data = useMemo(
        () =>
            Object.values(championStats).sort(
                (a, b) => b.performance - a.performance
            ),
        [championStats]
    );

    const columns = useMemo<Column<IPlayerChampionStats>[]>(
        () => [
            {
                accessor: "championId",
                Header: "Champion",
                Cell: ({ row }) => (
                    <div className="flex items-center">
                        <ChampionIcon
                            championId={row.original.championId}
                            size="sm"
                        />

                        <span className="ml-2 inline-block">
                            {
                                staticDataset?.championStats[
                                    row.original.championId
                                ].name
                            }
                        </span>
                    </div>
                ),
            },
            {
                id: "winrate",
                Header: "Winrate",
                right: true,
                Cell: ({
                    row,
                }: PropsWithChildren<
                    CellProps<IPlayerChampionStats, number>
                >) => (
                    <span
                        className={getWinrateClass(
                            row.original.wins,
                            row.original.games
                        )}
                    >
                        {formatPercentage(
                            row.original.wins,
                            row.original.games
                        )}
                    </span>
                ),
            },
            {
                accessor: "games",
                Header: "Games",
                right: true,
            },
            {
                accessor: "performance",
                Header: "Performance",
                right: true,
                Cell: ({ row }) => formatPercentage(row.original.performance),
            },
        ],
        []
    );

    console.log(data);

    const table = useTable({ data, columns });

    return <Table table={table} />;
};

export default PlayerChampionStats;

import { PropsWithChildren, useMemo } from "react";
import { CellProps, Column, useTable } from "react-table";
import IRoleStats from "../../../models/player/IRoleStats";
import formatPercentage from "../../../utils/formatting/percentage";
import { iconByRole } from "../../../utils/icons/role";
import { getWinrateClass } from "../../../utils/style/winrate";
import Table from "../../common/Table";

interface IProps {
    roleStats: IRoleStats[];
}

const PlayerRoleStats: React.FC<IProps> = ({ roleStats }) => {
    const data = useMemo(
        () => roleStats.sort((a, b) => b.games - a.games),
        [roleStats]
    );

    const totalGames = useMemo(
        () => roleStats.reduce((sum, x) => sum + x.games, 0),
        [roleStats]
    );

    const columns = useMemo<Column<IRoleStats>[]>(
        () => [
            {
                accessor: "role",
                Header: "Role",
                Cell: ({ row }) => {
                    const Icon = iconByRole(row.original.role);

                    return <Icon className="w-8" />;
                },
            },
            {
                id: "pickrate",
                Header: "Pickrate",
                right: true,
                Cell: ({
                    row,
                }: PropsWithChildren<CellProps<IRoleStats, number>>) => (
                    <span
                        className={
                            row.original.games / totalGames > 0.05
                                ? ""
                                : "text-gray-500"
                        }
                    >
                        {formatPercentage(row.original.games, totalGames)}
                    </span>
                ),
            },
            {
                id: "winrate",
                Header: "Winrate",
                right: true,
                Cell: ({
                    row,
                }: PropsWithChildren<CellProps<IRoleStats, number>>) => (
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
        [totalGames]
    );

    const table = useTable({ data, columns });

    return <Table table={table} />;
};

export default PlayerRoleStats;

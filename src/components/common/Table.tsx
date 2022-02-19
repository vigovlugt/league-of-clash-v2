import React from "react";
import { TableInstance } from "react-table";

interface IProps {
    table: TableInstance<any>;
}

const Table: React.FC<IProps> = ({ table }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        table;

    return (
        <div className="overflow-hidden border-b border-gray-700 shadow sm:rounded-lg">
            <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-700"
            >
                <thead className="bg-light-dark">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ${
                                        (column as any).right
                                            ? "text-right"
                                            : ""
                                    }`}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-700 bg-dark"
                >
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className={`whitespace-nowrap px-6 py-4 ${
                                                (cell.column as any).right
                                                    ? "text-right"
                                                    : ""
                                            }`}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

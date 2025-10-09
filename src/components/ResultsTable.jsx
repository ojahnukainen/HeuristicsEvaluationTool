import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const ResultsTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/submissions').then((res) => {
      const raw = res.data;
      const heuristicMap = {};

      raw.forEach((entry) => {
        const rate = entry.selectedProblemRate;
        entry.selectedOptions.forEach((heuristic) => {
          if (!heuristicMap[heuristic]) {
            heuristicMap[heuristic] = {};
          }
          heuristicMap[heuristic][rate] = (heuristicMap[heuristic][rate] || 0) + 1;
        });
      });

      const allRates = Array.from(
        new Set(raw.map((e) => e.selectedProblemRate))
      );

      const formattedData = Object.entries(heuristicMap).map(([heuristic, rates]) => {
        const row = { heuristic };
        allRates.forEach((rate) => {
          row[rate] = rates[rate] || 0;
        });
        return row;
      });
      console.log(formattedData, "dataa muodossa")
      const tableColumns = [
        {
          header: 'Heuristiikka',
          accessorKey: 'heuristic',
        },
        ...allRates.map((rate) => ({
          header: rate,
          accessorKey: rate,
        })),
      ];

      setData(formattedData);
      setColumns(tableColumns);
    });
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Heuristiikat ja ongelmien vakavuudet</h3>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-b text-left ">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-b">
                  {console.log(cell.column.columnDef.cell,"dataa")}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ResultsTable;

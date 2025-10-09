import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';


const HeuristicProblemRateTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'heuristic', direction: 'ascending' });
  const usersID = ["R1","R2","R3"];

  useEffect(() => {
    axios.get('http://localhost:3001/submissions').then((res) => {
      const raw = res.data.filter(c => usersID.includes(c.user));
      const heuristicMap = {};

      raw.forEach((entry) => {
        const rate = entry.selectedProblemRate;
        console.log(rate, "rateeeeee")
        entry.selectedOptions.forEach((heuristic) => {
          if (!heuristicMap[heuristic]) {
            heuristicMap[heuristic] = {};
          }
          heuristicMap[heuristic][rate] = (heuristicMap[heuristic][rate] || 0) + 1;
        });
      });
      console.log(heuristicMap,"2")
      const allRates = Array.from(
        new Set(raw.map((e) => e.selectedProblemRate))
      );
      console.log(allRates, "all rates")
      const formattedData = Object.entries(heuristicMap).map(([heuristic, rates]) => {
        const row = { heuristic };
        allRates.forEach((rate) => {
          row[rate] = rates[rate] ?? 0;
        });
        return row;
      });
      console.log(formattedData, "formaatti daataa")
  

      setData(formattedData);
    
    });
  }, []);


    const sortedData = [...data].sort((a, b) => {
        if (sortConfig !== null) {
            const { key, direction } = sortConfig;
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
        }
        console.log(data,"dataa")
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <h2>Sortable Table</h2>
            <table border="1" style={{ width: '50%', margin: '20px auto', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('Heuristics')} style={{ cursor: 'pointer' }}>
                            Heuristic {sortConfig.key === 'heuristic' && (sortConfig.direction === 'ascending' ? '🔼' : '🔽')}
                        </th>
                    
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((h, index) => (
                          
                        <tr key={index}>
                            <td>{h.heuristic}</td>
                            <td>{h.nimi}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HeuristicProblemRateTable;

// ResultsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ResultsTable from './components/ResultsTable';
import BasicNumbers from './components/BasicNumbers';
import HeuristicProblemRateTable from './components/HeuristicsProblemRateTable';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const optionsList = [
  "1. Visibility of system status",
  "2. Match between system and the real world",
  "3. User control and freedom",
  "4. Consistency and standards",
  "5. Error prevention",
  "6. Recognition rather than recall",
  "7. Flexibility and efficiency of use",
  "8. Aesthetic and minimalist design",
  "9. Help users recognize, diagnose, and recover from errors",
  "10. Help and documentation"
];
const usersID = ["R1","R2","R3"];

const ResultsPage = () => {
  const [counts, setCounts] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/submissions').then(res => {
      const sanitiseData = res.data.filter(c => usersID.includes(c.user))
      console.log("sanitaceData", sanitiseData)
      const allSelections = sanitiseData.flatMap(entry => entry.selectedOptions);
      const pituus = Object.keys(allSelections).length
      console.log(pituus)
      setTotalCount(pituus)
      const countMap = Object.fromEntries(optionsList.map(opt => [opt, 0]));
      allSelections.forEach(opt => {
        if (countMap[opt] !== undefined) countMap[opt]++;
      });
      setCounts(countMap);
      console.log(countMap, "count map")
      
    });
  }, []);

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: 'Valintojen määrä',
        data: Object.values(counts),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };
  
 

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  bg-gray-50 min-w-4xl" >
      <div className=" flex justify-center items-center min-w-4xl">
        <div className="w-3/4 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Valintojen jakauma</h2>
          <Bar data={chartData} />
        </div>
        
      </div>
    <hr />
      <div> 
       
      <h2>Total count: {totalCount}</h2>
    
     <HeuristicProblemRateTable />
    </div>
   </div>
  );
  
};

export default ResultsPage;

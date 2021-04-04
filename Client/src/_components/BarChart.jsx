import React, { useEffect, useState } from 'react';
import { accountService,companyService  } from '@/_services';
import { Chart } from 'react-charts';



function BarChart({match}) {
 const user = accountService.userValue;
  
  
  
 
  let [datas, setData] = useState({});

 

  useEffect(() => {
   
   setData([
      {
        label: 'Series 1',
        data: [
          { primary: "Baby Sensors AS", secondary: 1 },
          { primary: "Tollit AS", secondary: 1 },
          { primary: "Smart Cognition AS", secondary: 1 },
        ],
      },
      {
        label: 'Series 2',
        data: [
          { primary: "Elevate AS", secondary: 3 },
          { primary: "LeadX AS", secondary: 2 },
          { primary: "Boxeez AS", secondary: 1 },
        ],
      },
      {
        label: 'Series 3',
        data: [
          { primary: "RoadGuard AS", secondary: 2 },
          { primary: "Volur AS", secondary: 1 },
          { primary: "Leratech Solutions", secondary: 1 },
        ],
      }
    ]);
      
      
  });
   
   
  
        
  
  
  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: false }
    ],
    []
  );
  return (
    
    <>
       
        <div
       style={{
         width: '500px',
         height: '500px',
       }}
      >
       
        <Chart data={datas} series={series} axes={axes} tooltip />
       
      </div>
    </>
  );
}




export { BarChart }; 
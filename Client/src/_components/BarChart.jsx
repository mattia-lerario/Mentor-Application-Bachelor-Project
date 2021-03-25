import React from 'react'
import { Chart } from 'react-charts';

import { accountService,companyService, mentorService, alertService } from '@/_services'

 function BarChart({ids}) {
     const company = companyService.getAll();
    const data = React.useMemo(
     () => [
       {
         label: 'Series 1',
         data: [
           { primary: 1, secondary: 2 },
           { primary: 2, secondary: 5 },
           { primary: 3, secondary: 6 },
         ],
       },
      {
         label: 'Series 2',
         data: [
           { primary: 5, secondary: 10 },
           { primary: 2, secondary: 10 },
           { primary: 3, secondary: 10 },
         ],
       }, 
       {
         label: 'Series 3',
         data: [
           { primary: 1, secondary: 10 },
           { primary: 2, secondary: 10 },
           { primary: 3, secondary: 10 },
         ],
       }
     ],
     []
   )
  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "bottom", type: "linear", stacked: false }
    ],
    []
  );
  return (
    <>
      
        <div
       style={{
         width: '600px',
         height: '300px',
       }}
     >
        <Chart data={data} series={series} axes={axes} tooltip />
      </div>
    </>
  );
}




export { BarChart }; 
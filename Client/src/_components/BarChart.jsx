import React  from 'react'
import { Chart } from 'react-charts';



function BarChart() {
   
 
    const data = React.useMemo(
     () => [
       {
         label: 'Series 1',
         data: [
           { primary: "Baby Sensors AS", secondary: 6 },
           { primary: "Tollit AS", secondary: 2 },
           { primary: "Smart Cognition AS", secondary: 3 },
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
           { primary: "Leratech Solutions", secondary: 1},
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
       
        <Chart data={data} series={series} axes={axes} tooltip />
       
      </div>
    </>
  );
}




export { BarChart }; 
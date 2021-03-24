import React from 'react'
import { Chart } from 'react-charts'

 function BarChart() {
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
       /*{
         label: 'Series 2',
         data: [
           { primary: 1, secondary: 10 },
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
       },*/
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
      
     
        <Chart data={data} series={series} axes={axes} tooltip />
      
    </>
  );
}




export { BarChart }; 
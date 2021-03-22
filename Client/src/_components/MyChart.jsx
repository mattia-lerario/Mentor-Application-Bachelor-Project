import React from 'react'
import { Chart } from 'react-charts'
 
 function MyChart() {
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
       },
     ],
     []
   )
 
   const axes = React.useMemo(
     () => [
       { primary: true, type: 'linear', position: 'bottom' },
       { type: 'linear', position: 'left' },
     ],
     []
   )
 
   return (
     <div
       style={{
         width: '400px',
         height: '300px',
       }}
     >
       <Chart data={data} axes={axes} />
     </div>
   )
 }




export { MyChart }; 
import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { Chart } from 'react-charts'
 import { companyService, mentorService, alertService } from '@/_services';
 function MyChart() {
  
   const data = React.useMemo(
     () => [
       {
         label: 'Series 1',
         data: [
           { primary: 1, secondary: 2 },
           { primary: 2, secondary: 5 },
           { primary: 3, secondary: 8 },
         ],
       },
      /* {
         label: 'Series 2',
         data: [
           { primary: 1, secondary: 5 },
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
 
   const axes = React.useMemo(
     () => [
       { primary: true, type: 'linear', position: 'bottom' },
       { type: 'linear', position: 'bottom' },
     ],
     []
   )
 
   return (
     
     <div
       style={{
         width: '150px',
         height: '100px',
       }}
     >
       <Chart data={data} axes={axes} />
     </div>
    
   )
 }




export { MyChart }; 
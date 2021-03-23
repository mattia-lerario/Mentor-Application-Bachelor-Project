import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { Chart } from 'react-charts'
import { accountService,companyService, mentorService, alertService } from '@/_services';
 
 function MyChart({ids,datas}) {
    
    const userId = ids;
    console.log(ids);

      const data = React.useMemo(

     () =>[
       {

         label: 'Ranking',
         data: [
           { primary:1, secondary:2 },
           { primary:3, secondary: 4},
           { primary: 5, secondary: 7 },
         ],
       },
      ],
     []);
   
          
                    
           
    

   
 
   const axes = React.useMemo(
     () =>  [
       { primary: true, type: 'linear', position: 'bottom' },
       { type: 'linear', position: 'right' },
     ],
     []
   )
 
   return (
     
     <div
       style={{
         width: '600px',
         height: '300px',
       }}
     >
       <Chart data={data} axes={axes} />
     </div>
    
   )
 }




export { MyChart }; 
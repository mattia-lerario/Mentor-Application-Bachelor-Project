import React from 'react';
import { Chart } from 'react-charts';

 
async function MyChart() {
    
    //const companyId = ids.companies;
  //const company = await companyService.getAll();
    
   
   

    const data = React.useMemo(

     () =>[
       {
        
         label: 'Ranking',
         data: [
           { primary: 1, secondary: 2 },
           { primary: 2, secondary: 5 },
           { primary: 3, secondary: 8 },
         ],
       },
       {
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
       },
     ],
     []
   )
 
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
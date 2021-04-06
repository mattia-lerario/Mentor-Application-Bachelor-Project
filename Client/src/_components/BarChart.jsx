import React, { useEffect, useState } from 'react';
import { Chart } from 'react-charts';

// eslint-disable-next-line react/prop-types
function BarChart({companyData}) {
 
  let [data, setData] = useState(0);
 

  useEffect(() => {

     setData(companyData);
     
  });
  
  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "left" },
      { position: "bottom", type: "linear", stacked: true },
      
    ],
    []
  );
  

  return (
    <>
        <div
       style={{
         width: '500px',
         height: '600px',
       }}
      >
        <Chart data={data} series={series} axes={axes} tooltip />
       
      </div>
    </>
  );
}




export { BarChart }; 
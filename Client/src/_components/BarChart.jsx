import React, { useEffect, useState} from 'react';
import { Chart } from 'react-charts';
// eslint-disable-next-line react/prop-types
function BarChart({companyData}) {
 
  let [data, setData] = useState(0);
 

  useEffect(() => {

     setData(companyData);
     
  });

  /*
       //save to png
       document.getElementById("Download").addEventListener('click', function(){

  var url_base64jpg = document.getElementById("barChartD").toBase64Image();

  var a =  document.getElementById("Download");

         a.href = url_base64jpg;
        
}); 
*/   
  const series = React.useMemo(
    () => ({
      type: "bar",
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
          margin: '20px',
          padding:'20px',
         background:'darkslategray',
       }}
      >
        
   <Chart id="barChartD" data={data} series={series} axes={axes} tooltip dark />
       
               
      
                  
       
        
      </div>
      <a id="Download" download="chart.jpg" href="" className="btn btn-primary float-right bg-flat-color-1">Download As Image</a>
    </>
  );
}




export { BarChart }; 
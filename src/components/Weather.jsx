import React from 'react';

class Weather extends React.Component{
    
    render (){
       return(<div className = 'weather'>
              <div className = "weatherBack">
                  <div className= 'countryName'>
                  
                  <h1>Երևան</h1>
                  
                  </div>
                  
                  <div className ='main'>
                  <img src="src/img/weather/sunnny.png" />
                      <h1>29 &#8451;</h1>
                  </div>
               
               
               </div>
           
           </div>)        
    }
    
    
    
    
    
}
export default Weather;


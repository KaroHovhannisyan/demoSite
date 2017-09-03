var axios = require("axios");


function translator(word){
    
 console.log("Translateing");
 
    
    
    return axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4&lang=en-hy&text=${word}`).then(function(response, data)   {
            data = response.data.text[0];
           console.log(data);
           return (data);

        }
    )
            
    
    
    
    
    
  
        
    }


 function getCurrentCountryWeather(city){
     

     
     
 axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b9696a3feb7a102e0501212cc0cc2fa`)
      .then(res => {

        var WEATHER = {
            TEMP:Math.ceil(res.data.main.temp - 273,15),
            HUMIDITY:res.data.main.humidity,
            WIND:res.data.wind,
            NAME:translator(res.data.name),
            MAIN:res.data.weather[0].main,
            DESCRIPTION:res.data.weather[0].description   ,
            icon:res.data.weather[0].icon
            
        }
        
         console.log(WEATHER);
        
       
      });    
}



    

getCurrentCountryWeather("yerevan");


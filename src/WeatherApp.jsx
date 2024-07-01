import React, {useState, useEffect} from "react";
import InfoBlock from "./InfoBlock.jsx";
import TextInput from "./TextInput.jsx";

let openWeatherAPIKEY = 'YOUR-API-KEY-HERE'

function WeatherApp(){
    const [apiData, setApiData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function fetchLocation(stateName){
        try{
            setIsLoading(true);
            const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q="+stateName+"&appid="+openWeatherAPIKEY);
    
            if(!response.ok){
                throw new Error("Could Not Fetch");
            }
            const data = await response.json();
            fetchWeather(data[0].lat, data[0].lon)
            setIsLoading(false);
        }catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }
    
    async function fetchWeather(lat, lon){
        try{
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+openWeatherAPIKEY+"&units=metric");
    
            if(!response.ok){
                throw new Error("Could Not Fetch");
            }
    
            const data = await response.json();
            setApiData(data);
  
            if(document.getElementById("weatherBlock") != null){
                document.getElementById("weatherBlock").style.display = "flex";
            }
            
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", (e) =>{
            if(e.key == "Enter"){
                document.getElementById("searchButton").click()
            }
        })
        return () => {document.removeEventListener("keydown", (e) =>{
                if(e.key == "Enter"){
                    document.getElementById("searchButton").click()
                }
            })
        }
    }, [])

    return(
        <>
            <div className="container">
                <div className="searchBlock">
                        {isLoading ? <div style={
                            {zIndex: 2, width: "100dvw", height: "100dvh", 
                            position: "absolute", top: 0, left: 0, display: "flex", justifyContent: "center",
                            alignItems: "center", backgroundColor: "#21181B", opacity: .9}
                        
                        }><h1 style={{backgroundColor: "#21181B", color: "#FBF6D9"}}>LOADING</h1></div> : null}
                        <TextInput label="Country" id="countryName" placeholderText="Brazil/BR"/>
                        <TextInput label="City" id="cityName" placeholderText="Rio de Janeiro"/>

                    <button id="searchButton" onClick={() => fetchLocation(document.getElementById("cityName").value+","+document.getElementById("countryName").value)}>Search</button>
                </div>
                
                {
                    apiData != undefined ? 
                        <div id="weatherBlock" style={{display: "none"}}>
                            <h2>{apiData.name}</h2>
                            <h3>{apiData.weather[0].description}</h3>
                            <h3 id='temperature'>{apiData.main.temp} °C</h3>

                            <div className="infoBox">
                                <InfoBlock title="Wind" info={apiData.wind.speed + "m/s"}/>
                                <InfoBlock title="Pressure" info={apiData.main.pressure + "hPa"}/>
                                <InfoBlock title="Humidity" info={apiData.main.humidity + "%"}/>
                                <InfoBlock title="Min" info={apiData.main.temp_min +" °C"}/>
                                <InfoBlock title="Feels Like" info={apiData.main.feels_like + " °C"}/>
                                <InfoBlock title="Max" info={apiData.main.temp_max + " °C"}/>
                            </div>

                        </div>  
                    : null
                }
            </div>
        </>
    );
}



export default WeatherApp;
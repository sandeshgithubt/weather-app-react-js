import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

function WeatherCard({weatherInfo}) {
  //  props = weatherInfo;
    const [weatherState, setWeatherState] = useState("url(clear.jpg)");
    const {
        temp,
        humidity,
        pressure,
        weatherMood,
        city,
        speed,
        country,
        sunset,
    } = weatherInfo;
    
     //Background image changes as per weather condition
     const watherBackground = {
        backgroundImage: weatherState,
    }
   
    //Time conversion from microseconds to seconds
    let sec = sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()} PM`;
    let currentTime = new Date().getHours();
    console.log(currentTime);

    useEffect(() => {
        if(weatherMood === "Thunderstorm"){
            if(currentTime > 18){
                setWeatherState("url(thunderstorm-night.jpg)");  
            } else{
                setWeatherState("url(thunderstorm-day.jpg)");    
            }
        } else if(weatherMood === "Clouds"){
            if(currentTime > 18){
                setWeatherState("url(cloud-night.jpg)");  
            } else{
                setWeatherState("url(cloud-day.jpg)");    
            }  
        }
        else if(weatherMood === "Drizzle"){
            setWeatherState("url(heavy-rain.jpg)");    
        }
        else if(weatherMood === "Rain"){
            if(currentTime > 18){
                setWeatherState("url(heavy-rain.jpg)");  
            } else{
                setWeatherState("url(rain-day.jpg)");    
            }  
        }
        else if(weatherMood === "Snow"){
           setWeatherState("url(heavy-rain.jpg)");    
        }
        else if((weatherMood === "Mist") || (weatherMood === "Smoke") || (weatherMood === "Haze") || (weatherMood === "Dust") || (weatherMood === "Fog") || (weatherMood === "Sand") || (weatherMood === "Dust") || (weatherMood === "Ash") || (weatherMood === "Squall") ){
            if(currentTime > 18){
                setWeatherState("url(haze-night.jpg)");  
            } else{
                setWeatherState("url(haze-day.jpg)");    
            }  
        }
        else if(weatherMood === "Tornado"){
            if(currentTime > 18){
                setWeatherState("url(haze-night.jpg)");  
            } else{
                setWeatherState("url(haze-day.jpg)");    
            }  
        } else {
            setWeatherState("url(clear.jpg)");    
        }
    },[weatherInfo]);

  return (
    <div className="weatherWidget">
        <div className="weather-condition" style={watherBackground}>
        </div>

        <div className="weatherInfo">
            <div className="temp">
                <span className="temperature">{Math.floor(temp)}<sup>&deg; C</sup></span>
            </div>
           
            <div className="description">
                <div className="place">{city}, {country}</div>
                <div className="weatherCondition">{weatherMood}</div>
            </div>
            
            <div className="more-temp-info">
                <div className="temp-minmax info">
                    <i className="wi wi-sunset"></i>
                    <p className="align">
                        {timeStr}<br /> Sunset
                    </p>
                </div>
                <div className="humidity info">
                    <i className="wi wi-humidity"></i>
                    <p className="align">
                        {humidity} <br /> Humidity
                    </p>
                </div>
                <div className="pressure info">
                    <i className="wi wi-strong-wind"></i>
                    <p className="align">
                        {pressure} <br /> Pressure
                    </p>
                </div>
                <div className="wind info">
                    <i className="wi wi-windy"></i>
                    <p className="align">
                        {speed} <br /> Speed
                    </p>
                </div>
            </div>
            <div className="dateTime">{new Date().toLocaleString()}</div>
        </div>
        
    </div>
  );
}

export default WeatherCard;
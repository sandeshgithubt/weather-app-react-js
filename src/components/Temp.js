import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import "./Style.css";
import WeatherCard from "./WeatherCard";

function Temp(props) {
  const [searchValue, setSearchValue] = useState("Nagpur");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //console.log("sdfsdf", weatherInfo);
  // const [weatherState, setWeatherState] = useState("url(clear.jpg)");
  

  const getWeatherInfo = async () => {
    setLoading(true);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1348c249262ed7f1188a6402c6a60922`;
      const response = await fetch(url);
      // console.log("Response",response);
      const data = await response.json();
      if(data){
        setLoading(false);
      }
      if(data.message){
        setErrorMessage(data.message);
      } else {
        setErrorMessage("");
      }
      console.log("Data", data);
      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const city = data.name;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      console.log(data)
      const weatherDetails = {
          temp,
          humidity,
          pressure,
          weatherMood,
          city,
          speed,
          country,
          sunset,
        };
        setWeatherInfo(weatherDetails);
       
        // if(){

        // }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getWeatherInfo();
  },[]);

  console.log("weather info",weatherInfo);
  console.log("city",weatherInfo.city, searchValue);

  return (
    <div className="temp-wrap">
      <div className="weather-info-container">
        <div className="search-container">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search ..."
              // autofocus
              id="search"
              className="search-term"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="searchButton"
              type="button"
              onClick={(e) => getWeatherInfo()}
            >
              Search
            </button>
          </div>
        </div>

        {
          !loading ? (weatherInfo && Object.keys(weatherInfo).length !== 0 &&
          errorMessage ? <ErrorMessage city={searchValue} /> : <WeatherCard weatherInfo={weatherInfo}  />) 
          : (
            <div className="weatherInfo">
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            </div>
          )
        }
       
        
      </div>
    </div>
  );
}

export default Temp;
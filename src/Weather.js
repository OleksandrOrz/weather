import React, { useState } from "react";
import "./style.css";
import axios from "axios";

export default function Weather() {
  const [currentWeather, setCurrentWeather] = useState();

  const [City, setCity] = useState();
  function changeCity(event) {
    setCity(event.target.value);
  }
  function citySerch(resp) {
    console.log(resp);
    let iurl = `https://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`;
    setCurrentWeather(
      <ul>
        <li>Temperature: {Math.round(resp.data.main.temp)}°C</li>
        <li>Description: {resp.data.weather[0].description}</li>
        <li>Humidity: {resp.data.main.humidity}%</li>
        <li>Wind: {resp.data.wind.speed} km/h</li>

        <li>
          <img src={iurl} alt="weather icon" />
        </li>
      </ul>
    );
  }
  function Search(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=b0ce35cd54f47a37e37cfe580baaccdd&units=metric`;
    axios.get(url).then(citySerch);
  }
  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={Search}>
        {" "}
        <input
          type="search"
          placeholder="Type a city"
          onChange={changeCity}
        />{" "}
        <input type="submit" value="Search" />
      </form>
      <p>{currentWeather}</p>
    </div>
  );
}

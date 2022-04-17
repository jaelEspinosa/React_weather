import axios from "axios";
import { useEffect, useState } from "react";
import './Geolacation.css'
const Geolocation = ({ dataLat, dataLong }) => {
  console.log("desde geocomp ", dataLat, dataLong);
  const idioma = "sp, es";
  const ciudad = "madrid";
  const pais = "ES";
  const appID = "6363134c59c25df7b5455dc83fa23a67";
  const urlcoord = `https://api.openweathermap.org/data/2.5/weather?lat=${dataLat}&lon=${dataLong}&appid=${appID}&lang=es`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}&lang=${idioma}`;
  const iconUrl = "https://openweathermap.org/weather-conditions/";

  const [clima, setClima] = useState({
    name: "",
    tempMax: "",
    tempMin: "",
    icono: "",
    descrip: "",
  });

  useEffect(() => {
    const getWeather = async () => {
      const res = await axios.get(urlcoord);
      console.log(res.data);
      setClima({
        name: res.data.name,
        tempMax: res.data.main.temp_max,
        tempMin: res.data.main.temp_min,
        temp: res.data.main.temp,
        icono: res.data.weather[0].icon,
        descrip: res.data.weather[0].description,
      });
    };

    getWeather();
  }, []);

  console.log("mi clima", clima);

  return (
    <div>
      <div className="weather-contain">
        <h1>{clima.name}</h1>
        <h2>{parseInt(clima.temp - 273.15)}º</h2>
        <h3>Máx: {parseInt(clima.tempMax - 273.15)}º</h3>
        <h3>Min: {parseInt(clima.tempMin - 273.15)}º</h3>
        <div className="icono">
          <img
            src={`http://openweathermap.org/img/wn/${clima.icono}.png`}
            alt="clima"
          ></img>{" "}
          {/* url base para el icono */}
          <h4> {clima.descrip.toUpperCase()}</h4>
        </div>
      </div>
    </div>
  );
};

export default Geolocation;

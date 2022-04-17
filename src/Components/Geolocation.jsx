import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../Context/LoadingContext";
import './Geolacation.css'
import Loading from "./Loading";
const Geolocation = ({ dataLat, dataLong }) => {
  console.log("desde geocomp ", dataLat, dataLong);
  const idioma = "sp, es";
  const ciudad = "madrid";
  const pais = "ES";
  
  const appID = "6363134c59c25df7b5455dc83fa23a67";
  const urlcoord = `https://api.openweathermap.org/data/2.5/weather?lat=${dataLat}&lon=${dataLong}&appid=${appID}&lang=es`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}&lang=${idioma}`;
  const urlForeCast = `https://api.openweathermap.org/data/2.5/onecall?lat=${dataLat}&lon=${dataLong}&exclude=minutely,alerts,&appid=${appID}&lang=es&units=metric`                                                                         /* const iconUrl = "https://openweathermap.org/weather-conditions/"; para el icono*/
  const {isLoading, setIsLoading}=useContext(LoadingContext)

  const [clima, setClima] = useState({
    name: "",
    tempMax: "",
    tempMin: "",
    icono: "",
    descrip: "",
  });
  const [climaForesCast, setClimaForeCast]=useState([])

  useEffect(() => {
    setIsLoading(true)
    const getWeather = async () => {
      const res = await axios.get(urlcoord);
      const resForeCast = await axios.get(urlForeCast);
      /* console.log(res.data);
      console.log('foreCast',resForeCast.data.daily) */
      setClimaForeCast(resForeCast.data.daily)
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
  console.log("mi climafores", climaForesCast)
  setTimeout(() => {
    setIsLoading(false)
  },300);
    
  

  return (
    <div className="weather-contain">
        <Loading/>
        {!isNaN(clima.temp) && <div >        
        {<h1>{clima.name}</h1>}
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
      </div>}
      <h5>Próximos 7 dias</h5>
    { climaForesCast[0] && <div className="daily">
          
          <section className="daily-item">
            <p>dia 1</p>
            <p>Min.{parseInt(climaForesCast[0].temp.min)}º</p>
            <p>Max.{parseInt(climaForesCast[0].temp.max)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[0].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p>dia 2</p>
            <h6>{parseInt(climaForesCast[1].temp.max)}º-{parseInt(climaForesCast[1].temp.min)}º</h6>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[1].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p>dia 3</p>
            <h6>{parseInt(climaForesCast[2].temp.max)}º-{parseInt(climaForesCast[2].temp.min)}º</h6>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[2].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p>dia 4</p>
            <h6>{parseInt(climaForesCast[3].temp.max)}º-{parseInt(climaForesCast[3].temp.min)}º</h6>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[3].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p>dia 5</p>
            <h6>{parseInt(climaForesCast[4].temp.max)}º-{parseInt(climaForesCast[4].temp.min)}º</h6>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[4].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p>dia 6</p>
            <h6>{parseInt(climaForesCast[5].temp.max)}º-{parseInt(climaForesCast[5].temp.min)}º</h6>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[5].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p>dia 7</p>
            <h6>{parseInt(climaForesCast[6].temp.max)}º-{parseInt(climaForesCast[6].temp.min)}º</h6>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[6].weather[0].icon}.png`} alt='nube'></img>
          </section>
        
        
        </div>}  
     
    </div>
  );
};

export default Geolocation;

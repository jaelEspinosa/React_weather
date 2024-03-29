import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../Context/LoadingContext";
import ubicacion from '../img/ubicacion2.png'
import Buscador from "./Buscador";
import './Geolacation.css'
import Loading from "./Loading";
import Time from "./Time";
import logo from '../img/logo.png'
const Geolocation = ({ dataLat, dataLong }) => {
  
let Background;
let dia3; 
let dia4; 
let dia5;
let dia6;
let dia7;
const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  
  const appID = "6363134c59c25df7b5455dc83fa23a67";
  const urlcoord = `https://api.openweathermap.org/data/2.5/weather?lat=${dataLat}&lon=${dataLong}&appid=${appID}&lang=es`;
  const urlForeCast = `https://api.openweathermap.org/data/2.5/onecall?lat=${dataLat}&lon=${dataLong}&exclude=minutely,alerts,&appid=${appID}&lang=es&units=metric`
    
  const {setIsLoading}=useContext(LoadingContext)

  const [clima, setClima] = useState({
    name: "",
    tempMax: "",
    tempMin: "",
    icono: "",
    descrip: "",
    feels_like:"",
    wind:"",
  });
  const [climaForesCast, setClimaForeCast]=useState([])

  useEffect(() => {
    setIsLoading(true)
    const getWeather = async () => {
      const res = await axios.get(urlcoord);
      const resForeCast = await axios.get(urlForeCast);
      console.log('res.data es..',res.data);
      console.log('foreCast',resForeCast.data.daily)
      setClimaForeCast(resForeCast.data.daily)
      setClima({
        name: res.data.name,
        tempMax: res.data.main.temp_max,
        tempMin: res.data.main.temp_min,
        temp: res.data.main.temp,
        icono: res.data.weather[0].icon,
        descrip: res.data.weather[0].description,
        feels_like:res.data.main.feels_like,
        wind:res.data.wind.speed,
        id:res.data.weather[0].id
      });
    };
    
    getWeather();
  }, []);

  

  setTimeout(() => {
    setIsLoading(false)
  },100);
    
   if (climaForesCast[0]){
    
    dia3 = new Date((climaForesCast[2].dt)*1000).getDay() 
    dia4 = new Date((climaForesCast[3].dt)*1000).getDay() 
    dia5 = new Date((climaForesCast[4].dt)*1000).getDay() 
    dia6 = new Date((climaForesCast[5].dt)*1000).getDay() 
    dia7 = new Date((climaForesCast[6].dt)*1000).getDay() 
    
   }
   if(clima.id === 800){
    Background= "weather-contain despejado"
  }else if (clima.descrip === "nubes" || clima.descrip === "muy nuboso"){
    Background= "weather-contain nubes"
  }else if (clima.descrip==='nubes dispersas'|| clima.descrip==='algo de nubes'){
    Background= "weather-contain algunaNube"
  }else if(clima.main ==='Rain' || clima.main ==='Drizzle' || clima.descrip === 'lluvia ligera' ){
    Background= "weather-contain rain"
  }else if(clima.main==='Thunderstorm'){
    Background= "weather-contain Thunderstorm"
  }else if(clima.main ==="Snow"){
    Background= "weather-contain Snow"
  }else if(clima.main === 'Mist' || clima.main==='Haze'|| clima.main==='Fog'){
    Background= "weather-contain mist"
  }else if( clima.descrip === 'shower rain' || clima.descrip === "lluvia moderada"){
    Background = 'weather-conatain rain'   
    }else{
    Background= "weather-contain"  
  }
  

  return (
    <div className={Background}>
        <Buscador/>
        <Loading/>
        {!isNaN(clima.temp) && <div >        
        <h1 className="logo">{clima.name} <img className="logo" src = {ubicacion} alt = 'ubicacion'></img></h1>
        <Time/>
        <h1>Actual: {parseInt(clima.temp - 273.15)}º</h1>
        <h3>Máx: {parseInt(climaForesCast[0].temp.max)}º</h3>
        <h3>Min: {parseInt(climaForesCast[0].temp.min)}º</h3>
        <p>Sensación term.{parseInt(clima.feels_like-273.15)}º</p>
        <p>Velociad del viento: {parseInt(clima.wind)}m/s</p>
        <div className="icono">
          <img
            src={`http://openweathermap.org/img/wn/${clima.icono}.png`}
            alt="clima"
          ></img>{" "}
          {/* url base para el icono */}
          <h4> {clima.descrip.toUpperCase()}</h4>
        
        </div>
      </div>}
      <h5 className="title-daily">Previsión próx. dias</h5>
    { climaForesCast[0] && <div className="daily">
          
       
          <section className="daily-item">
            <p><strong>Mañana</strong></p>
            <p>Min.{parseInt(climaForesCast[1].temp.min)}º</p>
            <p>Máx.{parseInt(climaForesCast[1].temp.max)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[1].weather[0].icon}.png`} alt='nube'></img>
          </section>

          <section className="daily-item">
          <p><strong>{dias[dia3]}</strong></p>
            <p>Min.{parseInt(climaForesCast[2].temp.min)}º</p>
            <p>Máx.{parseInt(climaForesCast[2].temp.max)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[2].weather[0].icon}.png`} alt='nube'></img>
          </section>

          <section className="daily-item">
          <p><strong>{dias[dia4]}</strong></p>
            <p>Min.{parseInt(climaForesCast[3].temp.min)}º</p>
            <p>Máx.{parseInt(climaForesCast[3].temp.max)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[3].weather[0].icon}.png`} alt='nube'></img>
          </section>

          <section className="daily-item">
          <p><strong>{dias[dia5]}</strong></p>
            <p>Min.{parseInt(climaForesCast[4].temp.min)}º</p>
            <p>Máx.{parseInt(climaForesCast[4].temp.max)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[4].weather[0].icon}.png`} alt='nube'></img>
          </section>

          <section className="daily-item">
          <p><strong>{dias[dia6]}</strong></p>
            <p>Min.{parseInt(climaForesCast[5].temp.min)}º</p>
            <p>Máx.{parseInt(climaForesCast[5].temp.max)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[5].weather[0].icon}.png`} alt='nube'></img>
          </section>

          <section className="daily-item">
          <p><strong>{dias[dia7]}</strong></p>
            <p>Min.{parseInt(climaForesCast[6].temp.min)}º</p>
            <p>Máx.{parseInt(climaForesCast[6].temp.max)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[6].weather[0].icon}.png`} alt='nube'></img>
          </section>
        
        
        </div>}  
        <div className="firma">
        <p>weather by JaelEspinosa ©</p>
        <img src={logo} alt='logo'></img>
        </div>

         </div>
  );
};

export default Geolocation;

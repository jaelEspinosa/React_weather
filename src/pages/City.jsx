import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Time from "../Components/Time";
import { DateContext } from "../Context/DateContext"
import { LoadingContext } from "../Context/LoadingContext";
import './City.css'

import back from '../img/previous.png'
import { formatearFecha, nuevaHora } from "../helpers";
import Loading from "../Components/Loading";






const City = ()=>{
 let Background;

 const {find}=useContext(DateContext)
 const appID = "6363134c59c25df7b5455dc83fa23a67";
 const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${appID}&q=${find}&lang=es`;
 const urlForeCast1 =`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${appID}&q=${find}&units=metric&lang=es`
 
 const {loading, setIsLoading}=useContext(LoadingContext)
 const [clima, setClima] = useState({
    name: "",
    tempMax: "",
    tempMin: "",
    icono: "",
    descrip: "",
    feels_like:"",
    wind:"",
    main:"",
  });
  
  const [climaForesCast, setClimaForeCast]=useState([])
  const [alerta, setAlerta] = useState('')
  useEffect(() => {
    setIsLoading(true)
    const getWeather = async () => {
      try {
        const resForeCast = await axios.get(urlForeCast1); 
        const res = await axios.get(url); 
        setClimaForeCast(resForeCast.data.list)
      
      
        setClima({
        name: res.data.name,
        tempMax: res.data.main.temp_max,
        tempMin: res.data.main.temp_min,
        temp: res.data.main.temp,
        icono: res.data.weather[0].icon,
        descrip: res.data.weather[0].description,
        feels_like:res.data.main.feels_like,
        wind:res.data.wind.speed,
        main:res.data.weather[0].main,
        id:res.data.weather[0].id
      });
      setIsLoading(false) 
      } catch (error) {
        setAlerta('Ciudad No encontrada')
      }
           
           
     
     
    
    };
    
    getWeather();
  }, []);

  
  console.log (climaForesCast) 
if(clima.main === "Clear" || clima.descrip === 'cielo claro' ){
  Background= "weather-contain despejado"
}else if (clima.descrip === "nubes" || clima.descrip === "muy nuboso"){
  Background= "weather-contain nubes"
}else if (clima.descrip==='nubes dispersas'|| clima.descrip==='algo de nubes'){
  Background= "weather-contain algunaNube"
}else if(clima.main==='Rain' || clima.main ==='Drizzle' || clima.descrip === "lluvia ligera" ){
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
   
   return  <div className={Background}>
           
        {clima.temp && (clima.temp) && <div >        
        <h2 className="logo">{find.toUpperCase()}</h2>
        <Time/>
        <h1>Actual: {parseInt(clima.temp - 273.15)}º</h1>
        <h3>Máx: {parseInt(clima.tempMax-273.15)}º</h3>
        <h3>Min: {parseInt(clima.tempMin-273.15)}º</h3>
        <p>Sensación term.{parseInt(clima.feels_like-273.15)}º</p>
        <p>Velociad del viento: {parseInt(clima.wind)}m/s</p>
        <div className="icono">
          <img
            src={`http://openweathermap.org/img/wn/${clima.icono}.png`}
            alt="clima"
          ></img>{" "}
          {/* url base para el icono */}
          <h4>{clima.descrip.toUpperCase()}</h4>
        
        </div> 
      </div>}
      {alerta && <h1 className="no-encontrada">Ciudad no Encontrada</h1>}
      {loading ? <Loading /> : !alerta ? <h5 className="title-daily">previsión Próx. dias/ cada 3 Horas</h5>:null }
      { climaForesCast[0] && <div className="daily">
          {climaForesCast.map (clima => (
            <section className="daily-item" key={clima.dt}>
            <p>{formatearFecha(clima.dt_txt)}, {nuevaHora(clima.dt_txt)}</p>
            <p>Min.{parseInt(clima.main.temp_max)}º</p>
            <p>Máx.{parseInt(clima.main.temp_min)}º</p>
            <img src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} alt='nube'></img>
          </section>
          ))}            
        </div>}
      <div>
      <Link onclick={()=>setAlerta('')}to = '/'><img className="arrowLeft" src ={back} alt='flecha'></img></Link>         
      </div>
        
    </div>
}

export default City
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import Time from "../Components/Time";
import { DateContext } from "../Context/DateContext"
import { LoadingContext } from "../Context/LoadingContext";
import './City.css'
import algunaNuve from  '../img/alguna_nube.jpg'
import despegado from  '../img/despejado.jpg'
import lluvia from  '../img/lluvia.jpg'
import nieve from  '../img/nevando.jpg'
import nublado from  '../img/nublado.jpg'
import niebla from  '../img/niebla.jpg'






const City = ()=>{
 let Background;
 const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
 const {find}=useContext(DateContext)
 const appID = "6363134c59c25df7b5455dc83fa23a67";
 const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${appID}&q=${find}&lang=es`;
 const urlForeCast = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,alerts,&appid=${appID}&q=${find}&lang=es`
 const urlForeCast1 =`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${appID}&q=${find}&units=metric&lang=es`
 let navigate = useNavigate()
 const {isLoading, setIsLoading}=useContext(LoadingContext)
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
      const resForeCast = await axios.get(urlForeCast1); 
      const res = await axios.get(url);      
           
      console.log('res.data es..',res.data);
      console.log('foreCast',resForeCast.data)
      setClimaForeCast(resForeCast.data.list)
      console.log('foreCastarray',climaForesCast)
           
        setClima({
        name: res.data.name,
        tempMax: res.data.main.temp_max,
        tempMin: res.data.main.temp_min,
        temp: res.data.main.temp,
        icono: res.data.weather[0].icon,
        descrip: res.data.weather[0].description,
        feels_like:res.data.main.feels_like,
        wind:res.data.wind.speed
      });
    
    };
    
    getWeather();
  }, []);
  setTimeout(() => {
    setIsLoading(false)
  },100);
 



 console.log('La busqueda es', find)

   return  <div className="weather-contain">
                
        {clima.temp && (clima.temp) && <div >        
        <h1 className="logo">{find.toUpperCase()} </h1>
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
      <h5 className="title-daily">Previsión próx. horas/dias</h5>
      { climaForesCast[1] && <div className="daily">
          
       

          <section className="daily-item">
            <p><strong>{climaForesCast[1].dt_txt}</strong></p>
            <p>Min.{parseInt(climaForesCast[1].main.temp_max)}º</p>
            <p>Máx.{parseInt(climaForesCast[1].main.temp_min)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[1].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p><strong>{climaForesCast[5].dt_txt}</strong></p>
            <p>Min.{parseInt(climaForesCast[5].main.temp_max)}º</p>
            <p>Máx.{parseInt(climaForesCast[5].main.temp_min)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[5].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p><strong>{climaForesCast[9].dt_txt}</strong></p>
            <p>Min.{parseInt(climaForesCast[9].main.temp_max)}º</p>
            <p>Máx.{parseInt(climaForesCast[9].main.temp_min)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[9].weather[0].icon}.png`} alt='nube'></img>
          </section> <section className="daily-item">
            <p><strong>{climaForesCast[13].dt_txt}</strong></p>
            <p>Min.{parseInt(climaForesCast[13].main.temp_max)}º</p>
            <p>Máx.{parseInt(climaForesCast[13].main.temp_min)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[13].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p><strong>{climaForesCast[17].dt_txt}</strong></p>
            <p>Min.{parseInt(climaForesCast[17].main.temp_max)}º</p>
            <p>Máx.{parseInt(climaForesCast[17].main.temp_min)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[17].weather[0].icon}.png`} alt='nube'></img>
          </section>
          <section className="daily-item">
            <p><strong>{climaForesCast[21].dt_txt}</strong></p>
            <p>Min.{parseInt(climaForesCast[21].main.temp_max)}º</p>
            <p>Máx.{parseInt(climaForesCast[21].main.temp_min)}º</p>
            <img src={`http://openweathermap.org/img/wn/${climaForesCast[21].weather[0].icon}.png`} alt='nube'></img>
          </section>

          
        
        
        </div>}
      
      <Link to = '/'><h3>Back</h3></Link> 
        
    </div>
}

export default City
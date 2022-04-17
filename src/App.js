
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Geolocation from './Components/Geolocation';


function App() {
  let [lat, setLat]= useState('')
  let [long, setLong]=useState('')
  const idioma = 'sp, es'
  const appID = '6363134c59c25df7b5455dc83fa23a67'
  const ciudad = 'madrid'
  const pais = 'ES'
  const appID2='2c7cf0c9bfb0b3c9124e031b9a18e4fa'
 
  useEffect(()=>{
     const getCoord=()=>{
       navigator.geolocation.getCurrentPosition(position =>{
         setLat(lat = position.coords.latitude)
         setLong(long = position.coords.longitude)
         console.log ('desde useEffect ',lat,long)
       })
     }
     getCoord()
 },[]) 

 
 const getPosition = ()=>{
    navigator.geolocation.getCurrentPosition(position =>{
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
     setLong(long = position.coords.longitude)
     setLat(lat = position.coords.latitude)
     console.log('mis coordenadas des long y lat...', lat,long) 
    });
    /* const urlcoord = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${appID}` */
    // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
    /* https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} */
   /*  https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} */

   /* https://openweathermap.org/weather-conditions/{nombreicono.png} */   // para descargar el icono del clima
    
    const urlcoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appID}&lang=es`
   
    axios.get(urlcoord)
    .then ((res)=>{console.log(res.data)})

    .catch((error)=>{console.log('ubicacion desconocida')})
   
   
  

  }

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}&lang=${idioma}`
  
 

  const getWeather =  ()  =>{
    
     axios.get(url)
     .then ((res)=>console.log(res.data))
   
     .catch((error) =>{console.log('ciudad no válida')}
     
    

     )}
  return (
    <div className="App">
   
    {lat && long && <Geolocation dataLat = {lat} dataLong = {long}/>} 
    </div>
  );
}

export default App;

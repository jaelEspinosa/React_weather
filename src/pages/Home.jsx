import { useContext, useEffect, useState } from "react"
import Geolocation from "../Components/Geolocation"
import Loading from "../Components/Loading"
import { LoadingContext } from "../Context/LoadingContext"



const Home = ()=>{
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
            console.log ('desde home/useEffect ',lat,long)
          })
          
        }
        getCoord()
    },[]) 
    return <div>
   
    {lat && long && <Geolocation dataLat = {lat} dataLong = {long}/>} 
   {/*  <Loading/>  */}
    </div>
}

export default Home
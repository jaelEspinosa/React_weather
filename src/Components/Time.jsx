import { useContext, useEffect, useState } from 'react'
import { DateContext } from '../Context/DateContext'
import './Time.css'


const Time =()=>{
    const {fecha, setFecha,month,day,year,meses}=useContext(DateContext)
    useEffect(()=>{     
     
     setFecha(`${day} de ${meses[month]} de ${year}`) 
    
    },[])
    
    
    return <div>
        <h4>{fecha}</h4>
    </div>
}

export default Time
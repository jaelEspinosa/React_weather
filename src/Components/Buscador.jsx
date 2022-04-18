
import React from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { DateContext } from '../Context/DateContext'

import lupa from '../img/lupa.png'
import './Buscador.css'

const Buscador = ()=>{
    const {find,setFind}=useContext(DateContext)
    const {register,watch}=useForm()
    const getFind = ()=>{
        setFind(watch('newFind'))
        
        
    }
    
    

    return <div className='buscador'>

   <Link to = '/City'><img  src={lupa} alt='lupa' onClick={()=>getFind()}></img></Link>
    <input placeholder='Busca por ciudad'  type='text' {... register('newFind')}></input>
       
    </div>
}
export default Buscador
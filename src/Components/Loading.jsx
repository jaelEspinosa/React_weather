import { useContext } from "react"
import { LoadingContext } from "../Context/LoadingContext"
import './Loading.css'

const Loading = ()=>{
    const {isLoading}=useContext(LoadingContext)
    console.log('loading es ',isLoading)
    return  (
        <>
        
        {isLoading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        </>)
  }
     

export default Loading
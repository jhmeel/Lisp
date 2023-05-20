import axios from "axios";
import {useEffect, useState} from "react"

export const getRequest = (path)=>{
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [payload,setPayload] = useState(null);

   useEffect(()=>{
    setIsLoading(true)
     const fetchData = async ( )=>{
        try{
           const response = await axios.get(`http://localhost:4000/api/v1/${path}`);
        setPayload(response?.data)
         setIsLoading(false)
        }catch(err){
        setError(err)
        setIsLoading(false)
    }
}
   fetchData()
},[path])
    return {isLoading,payload,error}
}

export const postRequest = async (path,data)=>{
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [payload,setPayload] = useState(null);
    
    
   useEffect(()=>{
    setIsLoading(true)
     const postData = async ()=>{
         try{
            const response = await axios.post(`http://localhost:4000/api/v1/${path}`,data)
            setPayload(response?.data)
         setIsLoading(false)
         }catch(err){
            setError(err)
            setIsLoading(false)
        }

     }
     postData()
 },[path])
   
    
    return {isLoading,payload,error}

}


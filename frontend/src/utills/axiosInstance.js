import axios from 'axios';
import { Base_URL } from './apiPath';

const axiosInstance= axios.create({
    baseURL:Base_URL,
    timeout:10000,
    header:{
        "Content-Type":"application/json",
        Accept:"application/json",
    }
})

// Request intercepter..

axiosInstance.interceptors.request.use(
    (config)=>{
        const acessToken=localStorage.getItem('token')
        if(acessToken){
            config.headers.Authorization=`Bearer ${acessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// Respone Intercepter...
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response){
            if(error.response.status===401){
                window.location.href='/'
            }else if(error.response.status===500){
                console.log("Server Error ");
            }
        }else if(error.code==='ECONNABORTED'){
                 console.error("Request Timeout");
        }
        return Promise.reject(error);

    }
)

export default axiosInstance;
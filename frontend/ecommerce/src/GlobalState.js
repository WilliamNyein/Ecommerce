import React,{createContext,useState,useEffect} from 'react';
import ProductsApi from './api/ProductsApi';
import axios from 'axios';
import UserApi from './api/UserApi';
import CategoryApi from './api/CategoryApi';

export const  GlobalState = createContext()
 
export const DataProvider = ({children})=>{
    const [token,setToken] = useState(false)
    const refershToken = async ()=>{
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accesstoken)
    }
    useEffect(() => {
       const firstLogin = localStorage.getItem('firstLogin')
       if(firstLogin) refershToken()
       
    }, [])

    const state = {
        token : [token,setToken],
        productsApi : ProductsApi(),
        userApi :UserApi(token),
        categoryApi:CategoryApi(token)
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

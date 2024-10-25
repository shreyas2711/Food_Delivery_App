import axios from 'axios';
import { MENU_LOAD_FAIL, MENU_LOAD_REQUEST, MENU_LOAD_SUCCESS } from "../constants/menuConstants"
import { FOODSIZE_LOAD_FAIL, FOODSIZE_LOAD_REQUEST, FOODSIZE_LOAD_SUCCESS } from '../constants/foodSizeConstants';




export const GetMenuAction = ()=>async(dispatch)=>{
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem('token');
    dispatch({type:MENU_LOAD_REQUEST});
    try{
        const {data} = await axios.get(`${baseUrl}/api/menu/show`, { 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            withCredentials: true
          });
        console.log("Menu in action:",data);
       
        dispatch({
            type:MENU_LOAD_SUCCESS,
            payload:data
        })
        
    }
    catch(error){
        dispatch({
            type:MENU_LOAD_FAIL,
            payload: error.response ? error.response.data.error : 'Network error',
          });
    }
}

export const GetFoodSizeAction = ()=>async(dispatch)=>{

    dispatch({type:FOODSIZE_LOAD_REQUEST});
    try{
        const {data} = await axios.get(`/api/foodsize/show`);
        console.log("Foodsize in action:",data);
       
        dispatch({
            type:FOODSIZE_LOAD_SUCCESS,
            payload:data
        })
        
    }
    catch(error){
        dispatch({
            type:FOODSIZE_LOAD_FAIL,
            payload: error.response ? error.response.data.error : 'Network error',
          });
    }
}
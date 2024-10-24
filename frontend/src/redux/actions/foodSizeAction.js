import axios from 'axios';
import { FOODSIZE_LOAD_FAIL, FOODSIZE_LOAD_REQUEST, FOODSIZE_LOAD_SUCCESS } from '../constants/foodSizeConstants';

export const GetFoodSizeAction = ()=>async(dispatch)=>{

    dispatch({type:FOODSIZE_LOAD_REQUEST});
    try{
        const {data} = await axios.get('/api/foodsize/show');
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
import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST } from "../constants/orderConstants";

export const OrderAction = (orderData) => async (dispatch) => {

   const baseUrl = process.env.REACT_APP_BASE_URL;
   const token = localStorage.getItem('token');
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await axios.post(`${baseUrl}/api/order/create`, orderData, { 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response ? error.response.data.error : 'Network error',
      });
    }
  };
  

  export const getOrdersAction = ()=>async(dispatch)=>{
    
    try{
      const {data} = axios.get('/api/order/show');
      dispatch({
        type:GET_ORDER_REQUEST,
        payload:data
      })
      console.log("ordersss:",data);

    }catch(error){
      dispatch({
        type: GET_ORDER_FAIL,
        payload: error.response ? error.response.data.error : 'Network error',
      });
    }
      
  }
  
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../constants/orderConstants";

const initialState = {

    loading:false,
    success:false,
    orders:[],
   


};




// export const GetMenuReducer = (state = initialState,action)=>{

//     switch(action.type){
//         case MENU_LOAD_REQUEST:
//             return{...state}
//         case MENU_LOAD_SUCCESS:
//             return{
//                 ...state,
//                orders:action.payload
//             }
//         case MENU_LOAD_FAIL:
//             return{
//                 ...state,
//                 menu:[],
//                 loading:true,
//                 error:action.payload
//             }
//         default:
//             return state;
//     }
// }


export const orderCreateReducer = (state=initialState,action)=>{

    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CREATE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                orders:[...state.orders, action.payload],
            }
        case CREATE_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}


export const getOrderReducer = (state=initialState,action) =>{

        switch(action.type){
            case GET_ORDER_REQUEST:
                return{
                    ...state,
                    success:true,
                    error:action.payload
                }
            case GET_ORDER_SUCCESS:
                return{
                    ...state,
                    orders:action.payload,

                }
            case GET_ORDER_FAIL:
                return{
                    ...state,
                    orders:[],
                    error:action.payload
                }
            default:
                return state;
        }   
}
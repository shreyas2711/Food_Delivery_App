import { FOODSIZE_LOAD_FAIL, FOODSIZE_LOAD_REQUEST, FOODSIZE_LOAD_SUCCESS } from "../constants/foodSizeConstants";


const initialState = {

    loading:false,
    success:false,
    foodsize:[],
   


};


export const GetFoodSizeReducer = (state = initialState,action)=>{

    switch(action.type){
        case FOODSIZE_LOAD_REQUEST:
            return{...state}
        case FOODSIZE_LOAD_SUCCESS:
            return{
                ...state,
                foodsize:action.payload
            }
        case FOODSIZE_LOAD_FAIL:
            return{
                ...state,
                foodsize:[],
                loading:true,
                error:action.payload
            }
        default:
            return state;
    }
}
import { MENU_LOAD_FAIL, MENU_LOAD_REQUEST, MENU_LOAD_SUCCESS } from "../constants/menuConstants";


const initialState = {

    loading:false,
    success:false,
    menu:[],
   


};


export const GetMenuReducer = (state = initialState,action)=>{

    switch(action.type){
        case MENU_LOAD_REQUEST:
            return{...state}
        case MENU_LOAD_SUCCESS:
            return{
                ...state,
                menu:action.payload
            }
        case MENU_LOAD_FAIL:
            return{
                ...state,
                menu:[],
                loading:true,
                error:action.payload
            }
        default:
            return state;
    }
}
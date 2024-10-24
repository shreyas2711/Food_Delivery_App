const { USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNIN_FAIL, USER_LOGOUT, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST } = require("../constants/authConstants")



const initialState = {
    isAuthenticated:false,
    loading:false,
    error:null,
    details:null,
    // token:null,

}


exports.authReducer = (state=initialState,action)=>{

        switch(action.type){
            case USER_SIGNIN_REQUEST:
              return{
                ...state,
                loading:true,
                error:null
              }
            case USER_SIGNIN_SUCCESS:
               return{ 
                isAuthenticated:true,
                loading:false,
                error:null,
                token:action.payload.token,
                details:action.payload.user.email,
                
               };
            case USER_SIGNIN_FAIL:
                return{
                    isAuthenticated:false,
                    loading:false,
                    error:action.payload
                };
            case USER_LOGOUT:
              return{
                ...state,
                isAuthenticated:false,

              };
              case USER_SIGNUP_REQUEST:
                return{
                  ...state,
                  loading:true,
                  error:null
                }

            case USER_SIGNUP_SUCCESS:
              
              return{
                error:null,
              }
            case USER_SIGNUP_FAIL:
              return{
                error:action.payload
              }
            default:
                return state;

        }   
};


// import axios from 'axios';
// import { USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/authConstants';
// import { json } from 'react-router-dom';



// // export const userSignInAction = (user)=>async(dispatch)=>{
    
// //     dispatch({type:USER_SIGNIN_REQUEST});
// //     try{
// //         const {data} = await axios.post('/api/user/signin',user);
// //         console.log("signin:",data);
// //         dispatch({
// //             type:USER_SIGNIN_SUCCESS,
// //             payload:data
// //         })
// //         localStorage.setItem('token',JSON.stringify(data));
// //     }
// //     catch(error){
// //         dispatch({
// //             type:USER_SIGNIN_FAIL,
// //             payload: error.response ? error.response.data.error : 'Network error',
// //           });
// //     }
    
// // }


// export const userSignOutAction = ()=>async(dispatch)=>{

//     try{
//         const {data} = await axios.get('/api/user/signout');
//         localStorage.removeItem('token');

//         dispatch({
//             type:USER_LOGOUT,
//             payload:data,
//         });
//     }
//     catch(error){
//         dispatch({
//             payload:error.response.data.error,
//         })
//     }
// }
// // import axios from 'axios';
// import React from 'react'
// import { useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { userSignInAction } from '../redux/actions/authAction';
// import {useNavigate} from 'react-router-dom';
// import { useSelector } from 'react-redux/es/hooks/useSelector';
// // import './Login.css'
// // import { useEffect } from 'react';
// // import { useEffect } from 'react';

// export default function Login() {


//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//       });
//       const [errors, setErrors] = useState({
//         email: '',
//         password: '',
//       });


//       const handleInputChange = (e) => {
//         setFormData({
//           ...formData,
//           [e.target.name]: e.target.value,
//         });
    
//         setErrors({
//           ...errors,
//           [e.target.name]: '', // Clear the error when the user starts typing
//         });
//       };


     
// const handleFormSubmit = async(e)=>{

//     e.preventDefault();

//     if(!formData.email || !formData.password){
//         setErrors({
//             email:formData.email?'' :'email is required',
//             password:formData.password?'' :'Password is required',
//         });
//         return;
//     }
//     auth.loginAction(input);
//       return;
// };




//   return (
 
//       <div className="login-container" style={{ backgroundColor: 'rgb(71, 71, 245)', minHeight: '100vh', padding: '20px' }}>


//     <div className='login-class'>
//     {/* <div className="login-inputs"> */}
  
    
//        <form onSubmit={handleFormSubmit}>
//        {/* <h1 style={{marginTop:'2rem'}}>Login page</h1> */}
//        <div className="login-inputs">
//         <input
//           type="text"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           placeholder="email"
//           style={{height:'2rem',marginBottom:'1rem',width:'13rem'}}
//         />
//         <div style={{ color: 'red' }}>{errors.email}</div>

//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           placeholder="Password"
//           style={{height:'2rem',width:'13rem'}}
//         />
//         <div style={{ color: 'red' }}>{errors.password}</div>
//           <button className='login-button' type="submit" onClick={handleFormSubmit}>Log In</button>
//           {/* <button type="submit">Log out</button> */}
//           </div>
//       </form>
//       {/* </div> */}
//     </div>
    
//     </div>
    
  
//   )
// }



import { useState } from "react";
import { useAuth } from "../AuthProvider";
import './Login.css'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
        auth.loginAction(input);
        return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
    <div className="login-card">
  <h2>Login</h2>
  <form onSubmit={handleSubmitEvent}>
    <div className="form-control">
      <label htmlFor="user-email">Email:</label>
      <input
        type="email"
        id="user-email"
        name="email"
        placeholder="example@yahoo.com"
        aria-describedby="user-email"
        aria-invalid="false"
        onChange={handleInput}
      />
      <div id="user-email" className="error-msg">
        Please enter a valid email address.
      </div>
    </div>
    <div className="form-control">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Your password"
        aria-describedby="user-password"
        aria-invalid="false"
        onChange={handleInput}
      />
      <div id="user-password" className="error-msg">
        Password should be at least 6 characters.
      </div>
    </div>
    <button className="btn-submit">Login</button>
  </form>
</div>
</div>

  );
};

export default Login;

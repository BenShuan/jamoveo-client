import React, { createContext, useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login, Register } from '../api/authApi';
import { socket } from '../socket';


// costum hook for authorization function 
export default function useAuth() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const navigate = useNavigate();
  
  const success = (data) => {
    const res = data.data[0];
    console.log('res', res)
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(res));
    if (res.role === 'player') {

      navigate("/");
    } else {
      navigate("/admin");

    }
    return;
  };


  const loginAction =  (data,getError) => {

    
    const error = (err) => {
      console.log('err', err);
      getError(err)  
    };

     Login(data, success, error);

  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const registerAction =(data,getError)=>{
    const error = (err) => {
      console.log('err', err);
      getError(err)  
    };

     Register(data, success, error);

  }

  return{ user, loginAction, logOut,registerAction }
}



  
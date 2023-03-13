import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";
import '../App.css';

function Login({ setIsAuth }) {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  
  const login = () => {

    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });

  };

  return (
    <div className='login mt-8'>
      <label className='login__label text-lg font-medium text-gray-300'>Username</label>

      <input className='login__input w-full border-2 border-gray-100 rounded-xl text-gray-300 p-4 mt-1 bg-transparent' placeholder='Enter your username' onChange={(event) => {
        setUsername(event.target.value);
      }} />
      <label className='login__label text-lg font-medium text-gray-300'>Password</label>
      <input className='login__input w-full border-2 border-gray-100 rounded-xl text-gray-300 p-4 mt-1 bg-transparent' type="password" placeholder='Enter your password' onChange={(event) => {
        setPassword(event.target.value);
      }} />
      <div className='mt-8 flex flex-col gap-y-4'>
      <button className='login__button active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold' onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;

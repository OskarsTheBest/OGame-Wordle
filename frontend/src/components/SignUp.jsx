import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import '../App.css';

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  // Function to sign up a new user
  const signUp = () => {
    Axios.post('http://localhost:3001/signup', user).then((res) => {
      // Extracting user data from the response
      const {
        token,
        userId,
        firstName,
        lastName,
        username,
        hashedPassword,
      } = res.data;
      // Setting user data in cookies for future use
      cookies.set('token', token);
      cookies.set('userId', userId);
      cookies.set('username', username);
      cookies.set('lastName', lastName);
      cookies.set('firstName', firstName);
      cookies.set('hashedPassword', hashedPassword);
      // Setting authentication status to true
      setIsAuth(true);
    });
  };

  return (
    <div className="signup mt-8">
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2 text-gray-300" htmlFor="firstName">
          First Name
        </label>
        <input
          className="signup__input w-full border-2 border-gray-100 text-gray-300 rounded-xl p-4 bg-transparent"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2 text-gray-300" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="signup__input w-full border-2 border-gray-100 text-gray-300 rounded-xl p-4 bg-transparent"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2 text-gray-300" htmlFor="username">
          Username
        </label>
        <input
          className="signup__input w-full border-2 border-gray-100 text-gray-300 rounded-xl p-4 bg-transparent"
          type="text"
          name="username"
          placeholder="Username"
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2 text-gray-300"  htmlFor="password">
          Password
        </label>
        <input
          className="signup__input w-full border-2 border-gray-100 text-gray-300 rounded-xl p-4 bg-transparent"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
      </div>
      <div className='mt-8 flex flex-col gap-y-4'>
      <button
        className="signup__button active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 px-8 rounded-xl bg-violet-500 text-white text-lg font-bold"
        onClick={signUp}
      >
        Sign Up
      </button>
      </div>
    </div>
  );
}

export default SignUp;

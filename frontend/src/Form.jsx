import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

function Form({ setIsAuth }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleAlreadyHaveAnAccountClick = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleSignUpSubmit = () => {
    setIsAuth(true);
    setShowSignUp(false);
  };

  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
      <h1 className='text-5xl font-semibold'>Welcome Back</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>
        Welcome back! Please enter your details.
      </p>

      {showLogin && <Login setIsAuth={setIsAuth} />}

      {showSignUp && (
        <SignUp
          setIsAuth={setIsAuth}
          onSubmit={handleSignUpSubmit}
          onCancel={handleAlreadyHaveAnAccountClick}
        />
      )}

      {!showSignUp && (
        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Don't have an account?</p>
          <button
            onClick={handleSignUpClick}
            className='text-violet-500 text-base font-medium ml-2'
          >
            Sign Up
          </button>
        </div>
      )}

      {!showLogin && (
        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Already have an account?</p>
          <button
            onClick={handleAlreadyHaveAnAccountClick}
            className='text-violet-500 text-base font-medium ml-2'
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;

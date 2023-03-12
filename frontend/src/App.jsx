import React, { useEffect, useState} from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import JoinGame from './components/JoinGame';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from "universal-cookie";
import { generateWordSet } from './components/Words';
import WordleLogo from './static/WordleLogo.png';
import Form from './Form';

function App() {

  // Wordle generate word
  const [selectedWord, setSelectedWord] = useState("");
  const [wordSet, setWordSet] = useState(new Set());

  useEffect(() => {
    // Fetch a set of words and select a random one
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setSelectedWord(words.todaysWords);
    });
  }, []);

  const api_key = "s9hp376zjtsg";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

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




  const logOut = () => {
    // Remove all user cookies and disconnect user from Stream Chat
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  // Connect the user to Stream Chat if there is a token
  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstname: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    token
    ).then((user) => {
      setIsAuth(true);
    });
  }

  return (

<div className="App">
      {isAuth ? ( 
        // Show the chat and the join game component if the user is authenticated
        <Chat client={client}>
          <JoinGame wordSet={wordSet} selectedWord={selectedWord} />
          <button className='logout' onClick={logOut}>Log Out</button>
        </Chat>
      ) : (
        // Show the sign up and login components if the user is not authenticated
        <div className='flex w-full h-screen'>
          <div className='w-full flex items-center justify-center lg:w-1/2'>
          <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
      <h1 className='text-5xl font-semibold'>Wordle, but its 1vs1</h1>
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
          </div >
          <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
            <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin'></div>
            <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>


          </div>
        </div>
      )}
    </div>
  );
}

export default App;

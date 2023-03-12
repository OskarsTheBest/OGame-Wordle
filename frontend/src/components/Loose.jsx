import React from 'react'
import './WinLoss.css'


function Loose() {

  const handleGoBack = () => {
    window.location.href = "/";
  };

  return (
    <div className='wordleLoose'>
      <h1>You Lost</h1>
      <button className='go-back-btn' onClick={handleGoBack}>Go back</button>
    </div>
  )
}

export default Loose

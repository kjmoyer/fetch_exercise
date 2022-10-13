import React, { useState, useEffect } from 'react';

function Modal({ display, toggleModal}) {

  if (!display) {
    return (<></>)
  }
  return (
    <div id='successModal'>
      <div className='successMessage'>
        <h3 className='header'>Success!</h3>
        <p>Thank you for your submission</p>
        <button className='button' onClick={toggleModal}>Close</button>
      </div>
    </div>
  )
}

export default Modal
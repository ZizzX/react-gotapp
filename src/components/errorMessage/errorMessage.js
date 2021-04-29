import React from "react";

import './errorMessage.css';

const ErrorMessage = () => {
  return (
    <>
      <img src={process.env.PUBLIC_URL + '/img/errDeineris.jpg'} alt='error'/>
      <span className='errorSpan'>Something goes wrong!</span>
    </>
  )
};

export default ErrorMessage;

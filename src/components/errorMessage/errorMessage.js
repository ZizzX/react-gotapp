import React from "react";

import './errorMessage.css';

const ErrorMessage = () => {
  return (
    <div className="error-wrapper">
      <img src={process.env.PUBLIC_URL + '/img/errDeineris.jpg'} alt='error'/>
      <span className='errorSpan'>Something goes wrong!</span>
    </div>
  )
};

export default ErrorMessage;

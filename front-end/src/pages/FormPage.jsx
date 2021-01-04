import React from 'react';
import { DuffLogoTransparent } from '../images';
import '../css/formPage.css';

function FormPage({ children }) {
  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-img">
          <img src={ DuffLogoTransparent } alt="Duff Logo" className="duff-logo" />
        </div>
        { children }
      </div>
    </div>
  );
}

export default FormPage;

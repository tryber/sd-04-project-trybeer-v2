import React from 'react';
import { loading } from '../images';
import '../css/loading.css';

function Loading() {
  return (
    <div className="loading">
      <img src={ loading } alt="Page loading" />
      Loading...
    </div>
  );
}

export default Loading;

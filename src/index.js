import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App.jsx';
import './index.css';

// mount our App at #root-container
ReactDom.render(
  <App />,
  document.querySelector('#root-container'),
);

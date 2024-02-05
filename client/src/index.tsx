// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ts/App/App';
import './css/style.css';
import 'katex/dist/katex.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);


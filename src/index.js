import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GithubState from './context/github/GithubState';

ReactDOM.render(
  <GithubState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GithubState>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './components/context/AuthContext.tsx';  //named import from AuthContext
import { BrowserRouter } from 'react-router-dom'


// Auth0
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.render(
  <React.StrictMode>
    {/* Auth0 provider */}
    <Auth0Provider domain='dev-7yg33x6h.us.auth0.com' clientId='ZUNpVqnhpMpHRez4QUDNgn8e3atY4Kne' redirectUri='http://localhost:3000'>
      {/* Routes */}
      <BrowserRouter>
        {/* CONTEXT PROVIDER  */}
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

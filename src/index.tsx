import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './app';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);

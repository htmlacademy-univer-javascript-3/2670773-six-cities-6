import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {Provider} from "react-redux";
import {store} from "./store";
import {fillOffers} from "./store/action.ts";
import {offers} from "./mocks/offers.ts";

store.dispatch(fillOffers(offers));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

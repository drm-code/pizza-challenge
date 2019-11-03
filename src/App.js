import React, { useReducer } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';

import Context from './store/context';
import Main from './components/Main';
import reducer from './store/reducer';
import './App.css';

library.add(far, fas);

const initialState = JSON.parse(localStorage.getItem('pa-state') || '{}');

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Main />
    </Context.Provider>
  );
}

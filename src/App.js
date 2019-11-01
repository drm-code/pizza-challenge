import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

import Context from './store/context';
import Main from './components/Main';
import './App.css';

library.add(far, fas);

export default function App() {
  return (
    <Context.Provider value={false}>
      <Main />
    </Context.Provider>
  );
}

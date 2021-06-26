import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home/Index';
import NewRoom from './pages/newRoom/Index';
import { firebase, auth } from './services/firebase';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" component={ Home } exact />
        <Route path="/rooms/new" component={ NewRoom } />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

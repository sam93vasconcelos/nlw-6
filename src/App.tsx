import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import NewRoom from './pages/newRoom/NewRoom';
import Room from './pages/room/Room';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/rooms/new" exact component={ NewRoom } />
          <Route path="/rooms/:id" exact component={ Room } />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

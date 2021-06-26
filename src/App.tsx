import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import NewRoom from './pages/NewRoom/Index';
import Room from './pages/Room/Index';
import AdminRoom from './pages/AdminRoom/Index';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/rooms/new" exact component={ NewRoom } />
          <Route path="/rooms/:id" exact component={ Room } />
          <Route path="/admin/rooms/:id" exact component={ AdminRoom } />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

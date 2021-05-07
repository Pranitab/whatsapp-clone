import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [{user}] = useStateValue();
  //BEM naming conventions
  return (
    <div className="app">
      {!user ? (
      <Login/>
      ):(
        <div className="app__body">
        <Router>
         <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId">
               <Chat/>
           </Route>
             <Route path="/">
               <h1>Home Screen</h1>
             </Route>
        </Switch>
        </Router>
      </div>
      )}
     
    </div>
  );
}

export default App;

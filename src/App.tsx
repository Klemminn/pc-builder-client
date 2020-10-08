import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Sidebar, Buttons, Hidden } from 'components';

import HomePage from 'pages/Home';
import CpuPage from 'pages/Cpu';

const App = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);

  return (
    <Router>
      <Sidebar open={isOpenSidebar} toggleSidebar={toggleSidebar}>
        <Hidden.IsMobile>
          <Buttons.MenuButton onClick={toggleSidebar} />
        </Hidden.IsMobile>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cpu" component={CpuPage} />
          <Redirect to="/" />
        </Switch>
      </Sidebar>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/GlobalOverride.css';

import { Sidebar, Buttons, Hidden } from 'components';

import BuildPage from 'pages/BuildPage';
import CpuPage from 'pages/CpuPage';
import CpuCoolerPage from 'pages/CpuCoolerPage';
import MotherboardPage from 'pages/MotherboardPage';
import MemoryPage from 'pages/MemoryPage';
import GpuPage from 'pages/GpuPage';
import SsdPage from 'pages/SsdPage';
import HddPage from 'pages/HddPage';
import CasePage from 'pages/CasePage';
import PsuPage from 'pages/PsuPage';

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
          <Route exact path="/build/" component={BuildPage} />
          <Route exact path="/build/:buildId" component={BuildPage} />
          <Route exact path="/cpu" component={CpuPage} />
          <Route exact path="/cpuCooler" component={CpuCoolerPage} />
          <Route exact path="/motherboard" component={MotherboardPage} />
          <Route exact path="/memory" component={MemoryPage} />
          <Route exact path="/gpu" component={GpuPage} />
          <Route exact path="/ssd" component={SsdPage} />
          <Route exact path="/hdd" component={HddPage} />
          <Route exact path="/case" component={CasePage} />
          <Route exact path="/psu" component={PsuPage} />
          <Redirect to="/build/" />
        </Switch>
      </Sidebar>
    </Router>
  );
};

export default App;

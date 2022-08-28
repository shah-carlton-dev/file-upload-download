import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import FilesList from '../components/FilesList';
import Upload from '../components/Upload';
import Home from '../components/Home';
import Dev from '../components/Dev';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <div className="main-content">
        <Switch>
          <Route component={Home} path="/" exact={true} />
          <Route component={Upload} path="/upload" />
          <Route component={FilesList} path="/list" />
		  <Route component={Dev} path="/devtools" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
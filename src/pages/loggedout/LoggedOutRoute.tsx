import React from 'react';
import HomeLoggedOutPage from './HomeLoggedOutPage';
import NavigationBar from '../../components/navigation-bar/NavigationBar';
import { Redirect, Route, Switch } from 'react-router';
import { SearchResponse } from '../../components/search/Search';
import UserProfilePage from '../user-profile-page/UserProfilePage';
import './loggedout-route.css';

function LoggedOutRoute() {
  return (
    <div className="body-loggedout">
      <NavigationBar />
      <section className="loggedout-section">
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomeLoggedOutPage} />
          <Route path="/users/:username" component={UserProfilePage} />
          <Route path="/search/:value" component={SearchResponse} />
        </Switch>
      </section>
    </div>
  );
}

export default LoggedOutRoute;
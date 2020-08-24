import React from 'react';
import HomeLoggedOutPage from './HomeLoggedOutPage';
import NavigationBar from '../../components/navigation-bar/NavigationBar';
import RecipePage from '../recipe-page/RecipePage';
import { Route, Switch, Redirect } from 'react-router';
import { SearchResponse } from '../../components/search/Search';
import UserProfilePage from '../user-profile-page/UserProfilePage';
import './loggedout-route.css';

function LoggedOutRoute() {
  return (
    <div className="body-loggedout">
      <NavigationBar />
      <section className="loggedout-section">
        <Switch>
          <Redirect from="/account-settings" exact to="/" />
          <Redirect from="/home" exact to="/" />
          <Route exact path="/" component={HomeLoggedOutPage} />
          <Route path="/users/:username" component={UserProfilePage} />
          <Route path="/search/:value" component={SearchResponse} />
          <Route path="/:recipeTitle/:recipeId" component={RecipePage} />
        </Switch>
      </section>
    </div>
  );
}

export default LoggedOutRoute;

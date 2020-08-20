import React from 'react';
import HomeLoggedOutPage from './HomeLoggedOutPage';
import NavigationBar from '../../components/navigation-bar/NavigationBar';
import RecipePage from '../recipe-page/RecipePage';
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
          <Redirect from="/recipes-app/home" to="/" />
          <Route exact path="/recipes-app" component={HomeLoggedOutPage} />
          <Route path="/recipes-app/users/:username" component={UserProfilePage} />
          <Route path="/recipes-app/search/:value" component={SearchResponse} />
          <Route path="/recipes-app/:recipeTitle/:recipeId" component={RecipePage} />
        </Switch>
      </section>
    </div>
  );
}

export default LoggedOutRoute;

import React from 'react';
import HomeLoggedOutPage from './HomeLoggedOutPage';
import NavigationBar from '../../components/navigation-bar/NavigationBar';
import PageNotFound from '../page-not-found/PageNotFound';
import RecipePage from '../recipe-page/RecipePage';
import { Route, Switch, Redirect } from 'react-router';
import { SearchResponse } from '../../components/search/Search';
import UserProfilePage from '../user-profile-page/UserProfilePage';
import styled from 'styled-components';

const Section = styled.div`
  width: 100%;
  max-width: 968px;
  margin: 16px auto 0;
`;

function LoggedOutRoute() {
  return (
    <>
      <NavigationBar />
      <Section>
        <Switch>
          <Redirect from="/account-settings" exact to="/" />
          <Redirect from="/home" exact to="/" />
          <Route exact path="/" component={HomeLoggedOutPage} />
          <Route exact path="/users/:username" component={UserProfilePage} />
          <Route exact path="/search/:value" component={SearchResponse} />
          <Route
            path="/cookbook/:cookbookId/recipe/:recipeTitle/:recipeId"
            component={RecipePage}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Section>
    </>
  );
}

export default LoggedOutRoute;

import React from 'react';
import HomeLoggedOutPage from './HomeLoggedOutPage';
import NavigationBar from '../../components/NavigationBar';
import PageNotFound from '../PageNotFound';
import RecipePage from '../recipe-page/RecipePage';
import { Route, Switch, Redirect } from 'react-router';
import { SearchResponse } from '../../components/SearchRecipe';
import styled from 'styled-components';
import UserProfilePage from '../UserProfilePage';

const S = {
  Section: styled.div`
    width: 100%;
    max-width: 968px;
    margin: 16px auto 0;
    padding: 8px;
  `,
};

function LoggedOutRoute() {
  return (
    <>
      <NavigationBar />
      <S.Section>
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
      </S.Section>
    </>
  );
}

export default LoggedOutRoute;

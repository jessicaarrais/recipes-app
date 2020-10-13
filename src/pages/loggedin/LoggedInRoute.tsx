import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import AccountSettingsButton from '../../components/AccountSettingsButton';
import AccountSettingsPage from '../AccountSettingsPage';
import HomeLoggedInPage from './HomeLoggedInPage';
import NavigationBar from '../../components/NavigationBar';
import PageNotFound from '../PageNotFound';
import RecipePage from '../recipe-page/RecipePage';
import RecipePageEditionMode from '../recipe-page/RecipePageEditionMode';
import { SearchResponse } from '../../components/SearchRecipe';
import UserProfileButton from '../../components/UserProfileButton';
import UserProfilePage from '../UserProfilePage';
import styled from 'styled-components';

const S = {
  Section: styled.div`
    width: 100%;
    max-width: 968px;
    margin: 16px auto 0;
    padding: 8px;
  `,
};

export const ME = gql`
  query Me {
    me {
      id
      username
      avatar {
        uri
      }
    }
  }
`;

interface MeResponse {
  me: {
    id: string;
    username: string;
    avatar?: { uri: string };
  };
}

function LoggedInRoute() {
  const { data, loading, error } = useQuery<MeResponse>(ME);

  return (
    <>
      {error && <h1>An error has occurred. ${error.message}</h1>}
      {data && !loading && (
        <NavigationBar
          rightItems={
            <>
              <UserProfileButton username={data.me.username} uri={data.me.avatar?.uri} />
              <AccountSettingsButton />
            </>
          }
        />
      )}
      <S.Section>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home" component={HomeLoggedInPage} />
          <Route exact path="/account-settings" component={AccountSettingsPage} />
          <Route exact path="/users/:username" component={UserProfilePage} />
          <Route
            exact
            path="/edit/cookbook/:cookbookId/recipe/:recipeId"
            component={RecipePageEditionMode}
          />
          <Route exact path="/search/:value" component={SearchResponse} />
          <Route
            exact
            path="/cookbook/:cookbookId/recipe/:recipeTitle/:recipeId"
            component={RecipePage}
          />
          <Route component={PageNotFound} />
        </Switch>
      </S.Section>
    </>
  );
}

export default LoggedInRoute;

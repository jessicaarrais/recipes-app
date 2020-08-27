import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import AccountSettingsButton from '../../components/AccountSettingsButton';
import AccountSettingsPage from '../AccountSettingsPage';
import HomeLoggedInPage from './HomeLoggedInPage';
import NavigationBar from '../../components/navigation-bar/NavigationBar';
import PageNotFound from '../PageNotFound/PageNotFound';
import RecipePage from '../recipe-page/RecipePage';
import { RECIPE_FRAGMENT, RecipeProps } from '../../components/recipe/Recipe';
import { SearchResponse } from '../../components/search/Search';
import UserProfileButton from '../../components/UserProfileButton';
import UserProfilePage from '../user-profile-page/UserProfilePage';
import './loggedin-route.css';

export const COOKBOOK_FRAGMENT = gql`
  fragment CookbookFragment on Cookbook {
    __typename
    id
    recipes {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

export const GET_COOKBOOK = gql`
  query Me {
    me {
      id
      username
      avatar {
        uri
      }
      cookbook {
        ...CookbookFragment
      }
    }
  }
  ${COOKBOOK_FRAGMENT}
`;

interface MeResponse {
  me: {
    id: number;
    username: string;
    avatar: { uri: string };
    cookbook: {
      id: number;
      recipes: [RecipeProps];
    };
  };
}

function LoggedInRoute() {
  const { data, loading, error } = useQuery<MeResponse>(GET_COOKBOOK);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data) return null;

  return (
    <div className="body-loggedin">
      <NavigationBar
        rightItems={
          <>
            <UserProfileButton username={data.me.username} uri={data.me.avatar?.uri} />
            <AccountSettingsButton />
          </>
        }
      />
      <section className="loggedin-section">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route
            exact
            path="/home"
            render={() => (
              <HomeLoggedInPage
                cookbookId={data.me.cookbook.id}
                recipes={data.me.cookbook.recipes}
              />
            )}
          />
          <Route
            exact
            path="/account-settings"
            render={() => (
              <AccountSettingsPage
                username={data.me.username}
                uri={data.me.avatar?.uri}
              />
            )}
          />
          <Route exact path="/users/:username" component={UserProfilePage} />
          <Route exact path="/search/:value" component={SearchResponse} />
          <Route
            exact
            path="/cookbook/:cookbookId/recipe/:recipeTitle/:recipeId"
            component={RecipePage}
          />
          <Route component={PageNotFound} />
        </Switch>
      </section>
    </div>
  );
}

export default LoggedInRoute;

import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Home from './Home';
import Settings from './Settings';
import { RECIPE_FRAGMENT } from '../components/Recipe';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import Icon from '../components/Icon';
import '../assets/css/loggedin.css';

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
  query User {
    user {
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

function LoggedIn() {
  const { data, loading, error } = useQuery(GET_COOKBOOK);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <div className="body-loggedin">
      <NavigationBar username={data.user.username} uri={data.user.avatar?.uri} />
      <section className="loggedin-section">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route
            path="/home"
            render={() => (
              <>
                <Home
                  cookbookId={data.user.cookbook.id}
                  recipes={data.user.cookbook.recipes}
                />
                <div className="back-to-top-icon">
                  <Button type="button" actionType="default">
                    <Icon icon="keyboard_arrow_up" />
                  </Button>
                </div>
              </>
            )}
          />
          <Route
            path="/account-settings"
            render={() => (
              <Settings username={data.user.username} uri={data.user.avatar?.uri} />
            )}
          />
        </Switch>
      </section>
    </div>
  );
}

export default LoggedIn;

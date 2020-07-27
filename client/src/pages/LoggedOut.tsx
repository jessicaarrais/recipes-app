import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import Login from '../components/Login';
import Signin from '../components/Signin';
import Button from '../components/Button';
import '../assets/css/loggedout.css';
import { Redirect, Route, Switch } from 'react-router';
import User from './User';
import { SearchResponse } from '../components/Search';

function LoggedOut() {
  const [login, setLogin] = useState(false);
  const [signin, setSignin] = useState(false);
  return (
    <div className="body-loggedout">
      <NavigationBar isLoggedIn={false} />
      <section className="loggedout-section">
        <Switch>
          <Redirect from="/home" to="/" />
          <Route
            exact
            path="/"
            render={() => (
              <>
                <h1>Recipes</h1>
                <div>
                  <Button
                    type="button"
                    actionType="default"
                    handleOnClick={() => {
                      setLogin(true);
                      setSignin(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    type="button"
                    actionType="default"
                    handleOnClick={() => {
                      setSignin(true);
                      setLogin(false);
                    }}
                  >
                    Signin
                  </Button>
                </div>
                <div>
                  {login && <Login />}
                  {signin && <Signin />}
                </div>
              </>
            )}
          />
          <Route path="/users/:username" component={User} />
          <Route path="/search/:value" component={SearchResponse} />
        </Switch>
      </section>
    </div>
  );
}

export default LoggedOut;

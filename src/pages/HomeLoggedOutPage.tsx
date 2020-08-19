import React, { useState } from 'react';
import Button from '../components/Button';
import Login from '../components/Login';
import Signup from '../components/Signup';

function HomeLoggedOutPage() {
  const [login, setLogin] = useState(false);
  const [signin, setSignin] = useState(false);

  return (
    <>
      <h1>Cookbook</h1>
      <div className="buttons">
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
        </div>
        <div>
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
      </div>
      <div>
        {login && <Login />}
        {signin && <Signup />}
      </div>
    </>
  );
}

export default HomeLoggedOutPage;

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import standartAvatar from './../assets/img/chinchilla.jpg';
import '../assets/css/navigationbar.css';
import { Search } from './Search';
import Button from './Button';
import Icon from './Icon';

interface Props {
  isLoggedIn: boolean;
  username?: string;
  uri?: string;
}

function NavigationBar(props: Props) {
  const history = useHistory();

  return (
    <>
      <nav className="navbar">
        <div>
          <span onClick={() => history.push('/home')} />
          <Search />
        </div>
        {props.isLoggedIn && (
          <div>
            <Link to={`/users/${props.username}`} className="nav-link">
              <span className="nav-span-username">{props.username}</span>
              <img
                className="nav-avatar"
                alt="user's avatar"
                src={props.uri ? props.uri : standartAvatar}
              />
            </Link>
            <Link to="/account-settings">
              <Button actionType="default">
                <Icon icon="menu" />
              </Button>
            </Link>
          </div>
        )}
      </nav>
      <div className="navbar-padding" />
    </>
  );
}

export default NavigationBar;

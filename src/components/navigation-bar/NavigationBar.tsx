import React from 'react';
import { useHistory } from 'react-router-dom';
import { Search } from '../search/Search';
import './navigationbar.css';
import Button from '../styled-button/Button';
import Icon from '../Icon';

interface Props {
  rightItems?: React.ReactNode;
}

function NavigationBar(props: Props) {
  const history = useHistory();

  return (
    <>
      <nav className="navbar">
        <div className="home-button" title="Home">
          <Button actionType="default" handleOnClick={() => history.push('/')}>
            <Icon icon="home" />
          </Button>
          <Search />
        </div>
        <div>{props.rightItems}</div>
      </nav>
      <div className="navbar-padding" />
    </>
  );
}

export default NavigationBar;

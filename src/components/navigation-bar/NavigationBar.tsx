import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Search } from '../search/Search';
import Icon from '../icon/Icon';
import './navigationbar.css';

interface Props {
  rightItems?: React.ReactNode;
}

function NavigationBar(props: Props) {
  const history = useHistory();

  return (
    <div className="navbar-root">
      <nav className="navbar">
        <div className="home-button">
          <IconButton
            aria-label="Home"
            color="default"
            size="medium"
            onClick={() => history.push('/')}
          >
            <Icon icon="home" size="md-24" />
          </IconButton>
          <Search />
        </div>
        <div className="right-items">{props.rightItems}</div>
      </nav>
    </div>
  );
}

export default NavigationBar;

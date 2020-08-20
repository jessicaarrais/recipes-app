import React from 'react';
import { useHistory } from 'react-router-dom';
import { Search } from '../search/Search';
import './navigationbar.css';

interface Props {
  rightItems?: React.ReactNode;
}

function NavigationBar(props: Props) {
  const history = useHistory();

  return (
    <>
      <nav className="navbar">
        <div>
          <span onClick={() => history.push('/recipes-app/home')} />
          <Search />
        </div>
        <div>{props.rightItems}</div>
      </nav>
      <div className="navbar-padding" />
    </>
  );
}

export default NavigationBar;

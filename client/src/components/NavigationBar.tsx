import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router';

const nav: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  boxShadow: '0 0 3px 0 gray',
};
const userInfo: CSSProperties = {
  cursor: 'pointer',
};

interface Props {
  username: string;
}

function NavigationBar(props: Props) {
  const history = useHistory();

  const handleToSettingsNavigation = () => history.push('/account-settings');

  return (
    <nav style={nav}>
      <div
        style={userInfo}
        tabIndex={0}
        onClick={handleToSettingsNavigation}
        onKeyDown={handleToSettingsNavigation}
      >
        <h3>{props.username}</h3>
        <img alt="user's avatar" />
      </div>
    </nav>
  );
}

export default NavigationBar;

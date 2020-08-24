import React from 'react';
import { Link } from 'react-router-dom';
import Button from './styled-button/Button';
import Icon from './Icon';

function AccountSettingsButton() {
  return (
    <Link to="/account-settings" title="Settings">
      <Button actionType="default">
        <Icon icon="menu" />
      </Button>
    </Link>
  );
}

export default AccountSettingsButton;

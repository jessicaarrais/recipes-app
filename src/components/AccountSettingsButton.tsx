import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Icon from './icon/Icon';

function AccountSettingsButton() {
  return (
    <Link to="/account-settings" title="Settings">
      <IconButton color="default" size="medium">
        <Icon icon="menu" size="md-24" />
      </IconButton>
    </Link>
  );
}

export default AccountSettingsButton;

import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Icon } from '@material-ui/core';

function AccountSettingsButton() {
  return (
    <Link to="/account-settings" title="Settings">
      <IconButton color="default" size="medium">
        <Icon>menu</Icon>
      </IconButton>
    </Link>
  );
}

export default AccountSettingsButton;

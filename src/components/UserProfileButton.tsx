import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar/Avatar';

interface Props {
  username: string;
  uri?: string;
}

function UserProfileButton(props: Props) {
  return (
    <Link to={`/users/${props.username}`} className="nav-link">
      <span className="nav-span-username">{props.username}</span>
      <div className="nav-avatar">
        <Avatar uri={props.uri} />
      </div>
    </Link>
  );
}

export default UserProfileButton;

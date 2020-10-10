import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar/Avatar';
import styled from 'styled-components';

const UserProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 24px;
  border-radius: 16px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: antiquewhite;
  }
  &:active {
    background-color: thistle;
    transform: scale(0.95);
  }
`;

const Username = styled.span`
  color: #000000;
  margin-left: 8px;
  font-weight: bold;
`;

const AvatarThumbnail = styled.div`
  margin-left: 8px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  font-size: 12px;
  border-radius: 16px;
`;

interface Props {
  username: string;
  uri?: string;
}

function UserProfileButton(props: Props) {
  return (
    <UserProfileLink to={`/users/${props.username}`} className="nav-link" title="Perfil">
      <Username>{props.username}</Username>
      <AvatarThumbnail className="nav-avatar">
        <Avatar uri={props.uri} />
      </AvatarThumbnail>
    </UserProfileLink>
  );
}

export default UserProfileButton;

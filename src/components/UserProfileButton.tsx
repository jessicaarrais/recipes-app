import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar/Avatar';
import styled from 'styled-components';

const S = {
  UserProfileLink: styled(Link)`
    display: flex;
    align-items: center;
    margin: 0 12px;
    padding: 8px;
    border-radius: 16px;
    cursor: pointer;

    &:hover {
      background-color: antiquewhite;
    }
    &:active {
      background-color: thistle;
      transform: scale(0.95);
    }
  `,

  Username: styled.span`
    font-weight: bold;
  `,

  AvatarWrapper: styled.div`
    margin-inline-start: 8px;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
  `,
};

interface Props {
  username: string;
  uri?: string;
}

function UserProfileButton(props: Props) {
  return (
    <S.UserProfileLink to={`/users/${props.username}`} title="Perfil">
      <S.Username>{props.username}</S.Username>
      <S.AvatarWrapper>
        <Avatar uri={props.uri} />
      </S.AvatarWrapper>
    </S.UserProfileLink>
  );
}

export default UserProfileButton;

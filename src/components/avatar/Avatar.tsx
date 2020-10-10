import React from 'react';
import standartAvatar from './../../assets/img/chinchilla.jpg';
import styled from 'styled-components';

const ProfileAvatar = styled.img`
  width: 100%;
  object-fit: cover;
`;

interface Props {
  uri?: string;
}

function Avatar(props: Props) {
  return (
    <ProfileAvatar alt="user's avatar" src={props.uri ? props.uri : standartAvatar} />
  );
}

export default Avatar;

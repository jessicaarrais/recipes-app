import React from 'react';
import standartAvatar from './../../assets/img/chinchilla.jpg';
import './avatar.css';

interface Props {
  uri?: string;
}

function Avatar(props: Props) {
  return (
    <img
      className="avatar"
      alt="user's avatar"
      src={props.uri ? props.uri : standartAvatar}
    />
  );
}

export default Avatar;

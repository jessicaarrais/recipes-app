import React from 'react';
import './icon.css';

interface Props {
  icon:
    | 'home'
    | 'menu'
    | 'create'
    | 'add'
    | 'delete'
    | 'clear'
    | 'delete_forever'
    | 'filter_list'
    | 'sort'
    | 'search'
    | 'info'
    | 'favorite_border'
    | 'favorite'
    | 'star'
    | 'star_border'
    | 'keyboard_arrow_up'
    | 'lock'
    | 'lock_open';
  size: 'md-16' | 'md-24';
  title?: string;
}

function Icon(props: Props) {
  return (
    <span className={`material-icons ${props.size}`} title={props.title}>
      {props.icon}
    </span>
  );
}

export default Icon;

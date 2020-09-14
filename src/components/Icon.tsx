import React from 'react';

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
    | 'favorite_border'
    | 'star'
    | 'star_border'
    | 'keyboard_arrow_up'
    | 'lock'
    | 'lock_open';
  title?: string;
}

function Icon(props: Props) {
  return (
    <span className="material-icons" title={props.title}>
      {props.icon}
    </span>
  );
}

export default Icon;

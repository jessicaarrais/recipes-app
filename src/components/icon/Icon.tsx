import React from 'react';
import styled from 'styled-components';

const MaterialIcon = styled.i`
  /* Material Icons CSS rules */
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';

  &.md-16 {
    font-size: 16px;
  }
  &.md-20 {
    font-size: 20px;
  }
  &.md-24 {
    font-size: 24px;
  }
`;

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
  size: 'md-16' | 'md-20' | 'md-24';
  title?: string;
}

function Icon(props: Props) {
  return (
    <MaterialIcon className={props.size} title={props.title}>
      {props.icon}
    </MaterialIcon>
  );
}

export default Icon;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Search } from '../search/Search';
import Icon from '../icon/Icon';
import styled from 'styled-components';

const S = {
  NavBarRoot: styled.div`
    height: 64px;
  `,

  NavBar: styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 1;
    height: inherit;
    padding: 4px 16px;
    background-color: #ffccbc;
    box-shadow: 0 0 4px 0 #bdbdbd;
  `,

  SideItems: styled.div`
    display: flex;
  `,
};

interface Props {
  rightItems?: React.ReactNode;
}

function NavigationBar(props: Props) {
  const history = useHistory();

  return (
    <S.NavBarRoot>
      <S.NavBar>
        <S.SideItems>
          <IconButton
            aria-label="Home"
            color="default"
            size="medium"
            onClick={() => history.push('/')}
          >
            <Icon icon="home" size="md-24" />
          </IconButton>
          <Search />
        </S.SideItems>
        <S.SideItems>{props.rightItems}</S.SideItems>
      </S.NavBar>
    </S.NavBarRoot>
  );
}

export default NavigationBar;

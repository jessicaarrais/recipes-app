import React from 'react';
import { Button } from '@material-ui/core';
import Icon from '../icon/Icon';
import { RecipesListOrder } from '../../pages/loggedin/HomeLoggedInPage';
import styled from 'styled-components';

const S = {
  Header: styled.div`
    display: flex;
    align-items: center;
  `,

  ListOrganizersWrapper: styled.div`
    display: flex;
    align-items: center;
    margin: 0 -4px;
    padding-inline-start: 8px;
  `,

  ListOrganizersItemWrapper: styled.div`
    margin: 0 4px;
  `,
};

interface CookbookProps {
  createRecipeButton?: React.ReactNode;
  children: React.ReactNode;
  order: RecipesListOrder;
  refetchRecipes(order: RecipesListOrder): void;
  setOrder(order: RecipesListOrder): void;
}

export default function Cookbook(props: CookbookProps) {
  return (
    <>
      <S.Header>
        {props.createRecipeButton}
        <S.ListOrganizersWrapper>
          <S.ListOrganizersItemWrapper>
            <Button color="default" variant="contained" size="medium">
              <Icon icon="filter_list" size="md-24" />
            </Button>
          </S.ListOrganizersItemWrapper>
          <S.ListOrganizersItemWrapper>
            <SortList
              order={props.order}
              refetchRecipes={props.refetchRecipes}
              setOrder={props.setOrder}
            />
          </S.ListOrganizersItemWrapper>
        </S.ListOrganizersWrapper>
      </S.Header>
      <ul>{props.children}</ul>
    </>
  );
}

interface SortListProps {
  order: RecipesListOrder;
  refetchRecipes(order: RecipesListOrder): void;
  setOrder(oreder: RecipesListOrder): void;
}

function SortList(props: SortListProps) {
  const nextOrder =
    props.order === RecipesListOrder.TITLE_ASCENDING
      ? RecipesListOrder.DEFAULT
      : RecipesListOrder.TITLE_ASCENDING;

  const handleOnSortList = (): void => {
    props.refetchRecipes(nextOrder);
    props.setOrder(nextOrder);
  };

  return (
    <Button color="default" variant="contained" size="medium" onClick={handleOnSortList}>
      <Icon icon="sort" size="md-24" />
    </Button>
  );
}

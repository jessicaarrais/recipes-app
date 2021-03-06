import React from 'react';
import { Button, Icon } from '@material-ui/core';
import { RecipesListOrder } from '../pages/HomeLoggedInPage';
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
  newRecipeModalButton?: React.ReactNode;
  children: React.ReactNode;
  order: RecipesListOrder;
  refetchRecipes(order: RecipesListOrder): void;
  setOrder(order: RecipesListOrder): void;
}

export default function Cookbook(props: CookbookProps) {
  return (
    <>
      <S.Header>
        {props.newRecipeModalButton}
        <S.ListOrganizersWrapper>
          <S.ListOrganizersItemWrapper>
            <Button color="default" variant="contained" size="medium">
              <Icon>filter_list</Icon>
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
      <Icon>sort</Icon>
    </Button>
  );
}

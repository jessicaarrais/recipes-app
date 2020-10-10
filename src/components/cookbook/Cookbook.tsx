import React from 'react';
import { Button } from '@material-ui/core';
import Icon from '../icon/Icon';
import { RecipesListOrder } from '../../pages/loggedin/HomeLoggedInPage';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CreateRecipeWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-right: 8px;
`;

const ListOrganizersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -4px;
`;

const FilterListWrapper = styled.div`
  margin: 0 4px;
`;

const SortListWrapper = styled.div`
  margin: 0 4px;
`;

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
      <Header>
        <CreateRecipeWrapper>{props.createRecipeButton}</CreateRecipeWrapper>
        <ListOrganizersWrapper>
          <FilterListWrapper>
            <Button color="default" variant="contained" size="medium">
              <Icon icon="filter_list" size="md-24" />
            </Button>
          </FilterListWrapper>
          <SortList
            order={props.order}
            refetchRecipes={props.refetchRecipes}
            setOrder={props.setOrder}
          />
        </ListOrganizersWrapper>
      </Header>
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
    <SortListWrapper onClick={handleOnSortList}>
      <Button color="default" variant="contained" size="medium">
        <Icon icon="sort" size="md-24" />
      </Button>
    </SortListWrapper>
  );
}

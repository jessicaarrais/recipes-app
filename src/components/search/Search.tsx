import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import Icon from '../icon/Icon';
import RecipeCard from '../recipe/recipe-card/RecipeCard';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchBox = styled.input`
  width: 160px;
  height: 32px;
  border-style: none;
  border-radius: 16px;
  padding: 16px;
  margin: 0 8px;
  outline: none;
`;

const SEARCH_RECIPES = gql`
  query SearchRecipes($value: String!) {
    searchRecipes(value: $value) {
      id
      title
      description
      cookbookId
      owner {
        id
        username
      }
      likes
      isFavorite
      isLiked
      isPublic
    }
  }
`;

interface SearchResponse {
  searchRecipes: [
    {
      id: string;
      cookbookId: string;
      owner: {
        id: string;
        username: string;
      };
      title: string;
      description: string;
      likes: number;
      isFavorite: boolean;
      isLiked: boolean;
      isPublic: boolean;
    }
  ];
}

export function Search() {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  return (
    <Wrapper>
      <SearchBox
        type="text"
        value={searchValue}
        placeholder="Search Recipes"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <IconButton
        color="default"
        size="medium"
        disabled={searchValue.length < 1}
        onClick={() => {
          history.push(`/search/${searchValue}`);
          setSearchValue('');
        }}
      >
        <Icon icon="search" size="md-24" />
      </IconButton>
    </Wrapper>
  );
}

export function SearchResponse() {
  const { value } = useParams<{ value: string }>();

  const { data, loading, error } = useQuery<SearchResponse>(SEARCH_RECIPES, {
    variables: { value },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return data && data.searchRecipes.length > 0 ? (
    <ul>
      {data.searchRecipes.map((recipe) => {
        return <RecipeCard key={recipe.id} {...recipe} />;
      })}
    </ul>
  ) : (
    <p>Could not find a recipe</p>
  );
}

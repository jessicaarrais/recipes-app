import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import './search.css';
import PublicRecipeCard from '../recipe/public-list-view/PublicRecipeCard';

const SEARCH_RECIPES = gql`
  query SearchRecipes($value: String) {
    searchRecipes(value: $value) {
      id
      title
      cookbookId
    }
  }
`;

interface SearchResponse {
  searchRecipes: [{ id: string; title: string; cookbookId: string }];
}

export function Search() {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchValue}
        placeholder="Search Recipes"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Button
        type="button"
        actionType="secondary"
        disabled={searchValue === '' ? true : false}
        handleOnClick={() => {
          history.push(`/search/${searchValue}`);
          setSearchValue('');
        }}
      >
        <Icon icon="search" />
      </Button>
    </div>
  );
}

export function SearchResponse() {
  const { value } = useParams();

  const { data, loading, error } = useQuery<SearchResponse>(SEARCH_RECIPES, {
    variables: { value },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return data && data.searchRecipes.length > 0 ? (
    <ul>
      {data.searchRecipes.map((recipe) => {
        return <PublicRecipeCard key={recipe.id} {...recipe} />;
      })}
    </ul>
  ) : (
    <p>Could not find a recipe</p>
  );
}

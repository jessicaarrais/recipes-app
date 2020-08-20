import React, { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import urlParser from '../../utils/urlParser';
import './search.css';

const SEARCH_RECIPES = gql`
  query SearchRecipes($value: String) {
    searchRecipes(value: $value) {
      id
      title
    }
  }
`;

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
          history.push(`/recipes-app/search/${searchValue}`);
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

  const { data, loading, error } = useQuery(SEARCH_RECIPES, {
    variables: { value },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return data?.searchRecipes.length > 0 ? (
    <ul>
      {data.searchRecipes.map((recipe: any) => {
        const titleURL = urlParser(recipe.title);
        return (
          <Link to={`/recipes-app/${titleURL}/${recipe.id}`} key={recipe.id}>
            <li>
              <h3>{recipe.title}</h3>
            </li>
          </Link>
        );
      })}
    </ul>
  ) : (
    <p>Could not find a recipe</p>
  );
}

import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import FavoriteRecipeButton from '../../FavoriteButton';
import urlParser from '../../../utils/urlParser';

const GET_FAVORITES = gql`
  query GetFavorites {
    me {
      id
      favoriteRecipes
    }
  }
`;

interface Props {
  id: string;
  title: string;
  cookbookId: string;
}

function PublicRecipeCard(props: Props) {
  const { data } = useQuery(GET_FAVORITES);

  const titleURL = urlParser(props.title);
  const isFavorite = data?.me?.favoriteRecipes.includes(props.id);

  return (
    <div>
      <Link to={`/cookbook/${props.cookbookId}/recipe/${titleURL}/${props.id}`}>
        <li>
          <h3>{props.title}</h3>
        </li>
        <FavoriteRecipeButton recipeId={props.id} isFavorite={isFavorite} />
      </Link>
    </div>
  );
}

export default PublicRecipeCard;

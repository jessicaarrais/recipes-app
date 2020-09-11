import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteRecipeButton from '../../FavoriteButton';
import urlParser from '../../../utils/urlParser';

interface Props {
  id: string;
  title: string;
  cookbookId: string;
  isFavorite: boolean;
}

function PublicRecipeCard(props: Props) {
  const titleURL = urlParser(props.title);

  return (
    <div>
      <Link to={`/cookbook/${props.cookbookId}/recipe/${titleURL}/${props.id}`}>
        <li>
          <h3>{props.title}</h3>
        </li>
        <FavoriteRecipeButton recipeId={props.id} isFavorite={props.isFavorite} />
      </Link>
    </div>
  );
}

export default PublicRecipeCard;

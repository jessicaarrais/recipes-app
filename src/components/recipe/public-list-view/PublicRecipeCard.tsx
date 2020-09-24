import React from 'react';
import { Link } from 'react-router-dom';
import urlParser from '../../../utils/urlParser';
import FavoriteRecipeButton from '../../favorite-button/FavoriteButton';
import Icon from '../../icon/Icon';
import LikeButton from '../../like-button/LikeButton';
import './public-recipe-card.css';

export interface PublicRecipeProps {
  id: string;
  title: string;
  description: string;
  cookbookId: string;
  owner: { username: string };
  likes: number;
  isFavorite: boolean;
  isLiked: boolean;
}

function PublicRecipeCard(props: PublicRecipeProps) {
  const titleURL = urlParser(props.title);

  return (
    <li className="card">
      <Link to={`/cookbook/${props.cookbookId}/recipe/${titleURL}/${props.id}`}>
        <h2 className="title">{props.title}</h2>
        <p className="description">
          {props.description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem qui et sed unde,
          impedit error praesentium mollitia tenetur earum, fugiat ullam quod dicta
          repellendus vero quia delectus vitae dolore. Facilis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eligendi animi quam inventore quis doloribus
          asperiores earum corporis dicta! Repellendus eaque provident eos id optio
          aspernatur ipsum dolore explicabo eligendi reiciendis?
        </p>
        <div className="info">
          <span className="likes">
            <Icon icon="favorite" size="md-16" />
            <p>{props.likes}</p>
          </span>
          <span className="author-username">{props.owner.username}</span>
        </div>
        <hr />
        <div className="card-bottom">
          <LikeButton recipeId={props.id} isLiked={props.isLiked} />
          <FavoriteRecipeButton recipeId={props.id} isFavorite={props.isFavorite} />
        </div>
      </Link>
    </li>
  );
}

export default PublicRecipeCard;

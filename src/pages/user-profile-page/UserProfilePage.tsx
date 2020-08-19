import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import Avatar from '../../components/avatar/Avatar';
import './user-profile-page.css';

const GET_USER = gql`
  query User($username: String) {
    user(username: $username) {
      id
      username
      avatar {
        uri
      }
      cookbook {
        recipes {
          id
          title
          ingredients {
            id
            text
          }
          instructions {
            id
            step
            text
          }
        }
      }
    }
  }
`;

function UserProfilePage() {
  const { username } = useParams();

  const { data, loading, error } = useQuery(GET_USER, { variables: { username } });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return data.user ? (
    <div>
      <h2>{data.user.username}</h2>
      <div className="user-profile-avatar">
        <Avatar uri={data.user.avatar?.uri} />
      </div>
      <ul className="recipes">
        {data.user.cookbook.recipes.map((recipe: any) => (
          <Link to={`/${recipe.title}/${recipe.id}`} key={recipe.id} className="recipe">
            <li>
              <h2>{recipe.title}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  ) : (
    <h3>User not found</h3>
  );
}

export default UserProfilePage;

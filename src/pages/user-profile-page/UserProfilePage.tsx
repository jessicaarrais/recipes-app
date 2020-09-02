import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import Avatar from '../../components/avatar/Avatar';
import urlParser from '../../utils/urlParser';
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
        id
        recipes {
          id
          title
        }
      }
    }
  }
`;

interface UserResponse {
  user?: {
    id: string;
    username: string;
    avatar?: { uri: string };
    cookbook: {
      id: string;
      recipes: [
        {
          id: string;
          title: string;
        }
      ];
    };
  };
}

function UserProfilePage() {
  const { username } = useParams();

  const { data, loading, error } = useQuery<UserResponse>(GET_USER, {
    variables: { username },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  const user = data?.user;
  return user ? (
    <div>
      <h2>{user.username}</h2>
      <div className="user-profile-avatar">
        <Avatar uri={user.avatar?.uri} />
      </div>
      <ul className="recipes">
        {user.cookbook.recipes.map((recipe) => {
          const titleURL = urlParser(recipe.title);
          return (
            <Link
              to={`/cookbook/${user.cookbook.id}/recipe/${titleURL}/${recipe.id}`}
              key={recipe.id}
              className="recipe"
            >
              <li>
                <h3>{recipe.title}</h3>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  ) : (
    <h3>User not found</h3>
  );
}

export default UserProfilePage;

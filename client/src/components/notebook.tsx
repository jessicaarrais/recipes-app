import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Sheet from './sheet';

const GET_NOTEBOOK = gql`
  query User {
    user {
      notebook {
        sheets {
          id
          title
          todos {
            id
            text
            isChecked
          }
        }
      }
    }
  }
`;

function Notebook() {
  const { data, loading } = useQuery(GET_NOTEBOOK);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <ul>
        {data?.user.notebook.sheets.map((sheet: any) => (
          <Sheet key={sheet.id} title={sheet.title} todos={sheet.todos} />
        ))}
      </ul>
    </div>
  );
}
export default Notebook;

import React, { ChangeEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Avatar from './avatar/Avatar';

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      success
      message
      me {
        id
        avatar {
          uri
        }
      }
    }
  }
`;

interface Props {
  uri?: string;
}

function UploadAvatar(props: Props) {
  const [errorMessage, setErrorMessage] = useState(null);

  const [uploadAvatar, { loading, error }] = useMutation(UPLOAD_AVATAR, {
    onCompleted(data) {
      if (!data.uploadAvatar.success) {
        setErrorMessage(data.uploadAvatar.message);
      }
    },
  });

  const handleUploadAvatar = ({
    target: { validity, files },
  }: ChangeEvent<HTMLInputElement>): void => {
    const file = files?.[0];

    if (validity.valid) uploadAvatar({ variables: { file } });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <div>
      <label htmlFor="avatar">Upload photo</label>
      <input id="avatar" type="file" onChange={handleUploadAvatar} />
      {errorMessage && <p>{errorMessage}</p>}
      <div style={{ width: '100px' }}>
        <Avatar uri={props.uri} />
      </div>
    </div>
  );
}

export default UploadAvatar;

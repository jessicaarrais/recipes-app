import React, { ChangeEvent, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      success
      message
      avatar {
        id
        filename
      }
    }
  }
`;

interface Props {
  avatarFilename?: string;
}

function Avatar(props: Props) {
  const [filenameState, setFilenameState] = useState(props.avatarFilename);
  const [errorMessage, setErrorMessage] = useState(null);

  const [uploadAvatar, { loading, error }] = useMutation(UPLOAD_AVATAR, {
    onCompleted(data) {
      if (!data.uploadAvatar.success) {
        setErrorMessage(data.uploadAvatar.message);
        return;
      }
      setFilenameState(data.uploadAvatar.avatar.filename);
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
      {filenameState && (
        <img src={`http://localhost:4000/images/${filenameState}`} alt="user's avatar" />
      )}
    </div>
  );
}

export default Avatar;

import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const customStyle = {
    button: { backgroundColor: 'blue', color: 'white' },
    formContainer: {  },
  };
  return (
    <Authenticator style={customStyle}>
      {({ signOut, user }) => (
        <main>
          <h1 >Hello {user.username}</h1>
          <button style={customStyle.button} onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const customButtonStyle = {
    backgroundColor: 'blue',
    borderRadius: '20px',
    padding:'0.5rem 1rem',
    border: 'none',
    color: 'white'
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button style={customButtonStyle} onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
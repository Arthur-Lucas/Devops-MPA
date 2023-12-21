import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import UserModify from './view/UserModify';

Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      <Authenticator initialState="signUp" signUpAttributes={['family_name', 'name']}>
        {({ signOut, user }) => (
          <main>
            <Routes>
              <Route exact path="/" element={(
                <>
                  <h1>Hello {user.username}</h1>
                  <Link to="/profile">View Profile</Link>
                  <button onClick={signOut}>Sign out</button>
                </>
              )} />
              <Route path="/profile" element={<UserModify user={user.username} />} />
            </Routes>
          </main>
        )}
      </Authenticator>
    </Router>
  );
};

export default App;

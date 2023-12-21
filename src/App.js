import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { get, post } from "aws-amplify/api";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export default function App() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }

      try {
        const apiResponse = await get({
          apiName: "apiGetDetailsUser",
          path: `/getuser`,
        });
        const response = await apiResponse.response;
        const data = await response.body.json();
        await setUserData(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur front \n",
          error
        );
      }
    };

    fetchData();
  }, [user]);
  const handleSave = async () => {
    try {
      const apiResponse = await post({
        apiName:"apimodify", path : "/modifyuser", 
        options: {body: userData,
        queryParams: {
          id : userData.id
        }}
      });
      alert('modification(s) sauvegardée(s)')
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur", error);
    }
  };

  return (
    <Authenticator initialState="" signUpAttributes={["family_name", "name"]}>
  {({ signOut, user }) => {
    setUser(user);
    return (
      <main>
        
        <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="Profile" className="profile-image" />
          
        {!userData && 
          <div class="circle-border">
            <div class="circle-core"></div>
          </div>  
        }
        {userData && (
          <h1>Hello {userData.firstname}</h1>
        )}
        {userData && (
          <input
            type="text"
            value={userData.firstname}
            onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
          />
        )}
        {userData && (
          <input
            type="text"
            value={userData.lastname}
            onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
          />
        )}
        {userData && (
          <input
            type="text"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        )}
        
        <button className="save" onClick={handleSave}>save</button>
        <button className="signOut" onClick={signOut}>Sign out</button>
      </main>
    );
  }}
</Authenticator>

);
}

import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { get } from "aws-amplify/api";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export default function App() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Fonction pour charger les données de l'utilisateur
  //   const loadUserData = async () => {
  //     try {
  //       const apiResponse = await API.get(
  //         "apiGetDetailsUser",
  //         `/user/${user.username}`
  //       );
  //       setUserData(apiResponse);
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la récupération des données de l'utilisateur",
  //         error
  //       );
  //     }
  //   };

  //   // Charger les données de l'utilisateur uniquement s'il est authentifié
  //   if (user) {
  //     loadUserData();
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        // Si l'utilisateur n'est pas défini, ne rien faire
        return;
      }

      try {
        // console.log(user);
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

  return (
    <Authenticator initialState="" signUpAttributes={["family_name", "name"]}>
      {({ signOut, user }) => {
        setUser(user);
        return (
          <main>
            <nav>
              <button className="btn" onClick={signOut}>Sign out</button>
            </nav>
            {
              !userData && 
              <div class="circle-border">
                <div class="circle-core"></div>
              </div>  
            }
            {userData &&
            <div className="user">
              <img className="user-image" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"/>
               <p className="user-name">{!userData.firstname ? 'firstname undefined' : userData.firstname}, {!userData.lastname ? 'lastname undefined' : userData.lastname}</p>
              <div className="user-username__section">
                <p className="user-username">@{user.username}</p> 
                <i class="fa fa-clipboard"></i>
              </div>
              <p className="user-email">{!userData.email ? 'email undefined' : userData.email}</p>
              <p className="user-company">{!userData.company ? 'company undefined' : userData.company}</p>
              <p className="user-business-sector">{userData.email}</p>
            </div>}
          </main>
        );
      }}
    </Authenticator>
  );
}

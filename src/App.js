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
            <h1>Hello {user.username}</h1>
            {/* Affichez les données de l'utilisateur */}
            {userData && <p>Firstname : {userData.firstname}</p>}
            {userData && <p>Lastname : {userData.lastname}</p>}
            {userData && <p>Email : {userData.email}</p>}
            <button onClick={signOut}>Sign out</button>
          </main>
        );
      }}
    </Authenticator>
  );
}

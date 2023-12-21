/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_USERS_ARN
	STORAGE_USERS_NAME
	STORAGE_USERS_STREAMARN
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
// import { Storage } from 'aws-amplify/storage';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  //   console.log(`EVENT: ${JSON.stringify(event)}`);
  const region =
    event.requestContext.identity.cognitoIdentityPoolId.split(":")[0];

  const cognitoAuthenticationProvider =
    event.requestContext.identity.cognitoAuthenticationProvider;
  const parts = cognitoAuthenticationProvider.split(":");
  const userId = parts[parts.length - 1].trim();

  const userTableName = process.env.STORAGE_USERS_NAME;

  //   console.log(userId, region, userTableName);

  // Configuration de l'accès à DynamoDB
  AWS.config.update({
    region: region,
  });

  // Paramètres de requête DynamoDB
  const params = {
    TableName: userTableName,
    Key: {
      id: userId,
    },
  };

  try {
    const data = await dynamoDB.get(params).promise();

    if (data.Item) {
      console.log(data);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(data.Item),
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ message: "Utilisateur non trouvé" }),
      };
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur",
      error
    );
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur serveur" }),
    };
  }
};

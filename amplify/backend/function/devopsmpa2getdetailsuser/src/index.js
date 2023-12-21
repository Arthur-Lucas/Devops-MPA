/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  //   return {
  //     statusCode: 200,
  //     //  Uncomment below to enable CORS requests
  //     //  headers: {
  //     //      "Access-Control-Allow-Origin": "*",
  //     //      "Access-Control-Allow-Headers": "*"
  //     //  },

  //     body: JSON.stringify("Hello from Lambda!"),
  //   };

  const userId = event.pathParameters.id;

  // Configuration de l'accès à DynamoDB
  AWS.config.update({
    region: "eu-west-3", // Remplacez par la région de votre DynamoDB
  });

  const documentClient = new AWS.DynamoDB.DocumentClient();

  // Paramètres de requête DynamoDB
  const params = {
    TableName: "users",
    Key: {
      userId: userId,
    },
  };

  try {
    const data = await documentClient.get(params).promise();

    if (data.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      };
    } else {
      return {
        statusCode: 404,
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

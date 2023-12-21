

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    console.log(event.queryStringParameters);
    console.log('body: ', event.body);
  };


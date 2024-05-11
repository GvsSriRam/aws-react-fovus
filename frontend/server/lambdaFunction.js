const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const params = {
    TableName: 'fovus-table',
    Item: {
      id: body.id,
      input_text: body.input_text,
      input_file_path: body.input_file_path
    }
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved successfully' })
    };
  } catch (error) {
    console.error('Error saving data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not save data' })
    };
  }
};

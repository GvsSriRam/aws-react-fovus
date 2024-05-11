import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1"
});
const docClient = DynamoDBDocumentClient.from(client);

export const dbInsert = async (params) => {
  try {
    const command = new PutCommand({
      TableName: "fovus-files",
      Item: params,
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error inserting into DynamoDB", error);
    throw error;
  }
};


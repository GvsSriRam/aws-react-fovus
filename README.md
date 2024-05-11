# Fovus App

This is a simple React application that allows users to upload a file and input text. The application then saves the file to an S3 bucket and the text input and file path to a DynamoDB table. After the data is saved, the application creates an EC2 instance, logs the instance ID, and then terminates the instance.

## Dependencies

- `react`
- `nanoid`
- AWS SDK

## File Structure

- `App.js`: This is the main component of the application. It contains the form for the user input and handles the form submission.
- `uploadFile.ts`: This module contains the `upload` function, which uploads a file to an S3 bucket.
- `dbPut.ts`: This module contains the `dbInsert` function, which inserts an item into a DynamoDB table.
- `vmFunc.ts`: This module contains the `createEC2Instance` and `terminateEC2Instance` functions, which create and terminate an EC2 instance, respectively.

## Usage

To use the application, simply run `npm start` in the terminal. This will start the application on `localhost:3000`.

## Error Handling

The application has basic error handling. If there is an error uploading the file or saving the data, the error will be logged to the console. If the user does not provide both a file and text input, an error message will be logged to the console.

## AWS Configuration

The application is configured to use the following AWS resources:

- S3 bucket: `fovus-gvs`
- DynamoDB table: `fovus-files`
- EC2 instance: The application creates a new EC2 instance each time the form is submitted and then terminates the instance.

If you want to use different AWS resources, you will need to modify the corresponding functions in `uploadFile.ts`, `dbPut.ts`, and `vmFunc.ts`.
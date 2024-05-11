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

## Setup

To set up the application, follow these steps:

1. Clone the repository to your local machine:
    ```
    git clone https://github.com/GvsSriRam/aws-react-fovus.git
    ```

2. Navigate to the project directory:
    ```
    cd aws-react
    cd frontend
    ```

3. Install the dependencies using npm:
    ```
    npm install
    ```

4. Configure your AWS credentials by creating a `~/.aws/credentials` file with the following content:
    ```
    [default]
    aws_access_key_id = YOUR_ACCESS_KEY_ID
    aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
    ```

5. Update the AWS resource names in the code:
    - Replace `fovus-gvs` with your S3 bucket name in `uploadFile.ts`.
    - Replace `fovus-files` with your DynamoDB table name in `dbPut.ts`.

6. Start the application:
    ```
    npm run start
    ```

7. Open your browser and navigate to `localhost:3000` to use the application.

## Usage

To use the application, simply run `npm start` in the terminal. This will start the application on `localhost:3000`.

## Error Handling

The application has basic error handling. If there is an error uploading the file or saving the data, the error will be logged to the console. If the user does not provide both a file and text input, an error message will be logged to the console.

## AWS Configuration

The application is configured to use the following AWS resources:

- S3 bucket: `fovus-gvs`
- DynamoDB table: `fovus-files`
- EC2 instance: The application creates a new EC2 instance each time the form is submitted and then terminates the instance.

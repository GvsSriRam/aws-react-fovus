#!/bin/bash

# Get the id from the environment variable
id=${ID}

# Get the inputs from DynamoDB FileTable by id
result=$(aws dynamodb get-item --table-name fovus-files --key "{\"id\": {\"S\": \"${id}\"}}" --query 'Item.{inputText:input_text.S, inputFilePath:input_file_path.S}' --output json)

# Parse the result to get inputText and inputFilePath
inputText=$(echo $result | jq -r '.inputText')
inputFilePath=$(echo $result | jq -r '.inputFilePath')

# Download the input file from S3
aws s3 cp s3://${inputFilePath} ~/temp1.txt

# Append the retrieved input text to the downloaded input file and save it as OutputFile.txt
echo "${inputText}" >> ~/temp1.txt

# Upload the output file to S3
aws s3 cp ~/temp1.txt s3://fovus-out-gvs/OutputFile1.txt

# Save the outputs and S3 path in DynamoDB File Table
aws dynamodb put-item --table-name fovus-out-files --item "{\"id\": {\"S\": \"${id}\"}, \"output_file_path\": {\"S\": \"fovus-gvs/OutputFile1.txt\"}}"
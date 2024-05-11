import AWS from 'aws-sdk';
import {EC2Client, RunInstancesCommand} from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client({
    region: "us-east-1"
  });

export async function createEC2Instance(id) {
    console.log(id)

    const startupScript = `
    #!/bin/bash
    aws s3 cp s3://shell-script-gvs/out.sh ~/out.sh
    cd ~
    chmod 777 out.sh
    ID="${id}" sh out.sh
  `;
    console.log(startupScript)

    var Buffer = require('buffer/').Buffer
    let instanceId: string | null = null;
    const command = new RunInstancesCommand({
        ImageId: "ami-07caf09b362be10b8",
        InstanceType: "t2.micro",
        MinCount: 1,
        MaxCount: 1,
        KeyName: "fovus-key",
        SecurityGroupIds: ["sg-053e4d7d10e8d342a"],
        IamInstanceProfile: {
          Name: "ec2-admin",
        },
        UserData: Buffer.from(startupScript).toString('base64')
      });

    try {
        const data = await ec2Client.send(command);
        console.log("Success", data);
      } catch (error) {
        console.error("Error", error);
      }
    

  return instanceId;

}

export async function terminateEC2Instance(instanceId) {
    const params = {
      InstanceIds: [instanceId],
    };
  
    ec2Client.terminateInstances(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }

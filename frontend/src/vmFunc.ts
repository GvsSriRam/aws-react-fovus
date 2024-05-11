import AWS from 'aws-sdk';
AWS.config.update({
    region: "us-east-1"
});

const ec2Client = new AWS.EC2();
export async function createEC2Instance(id) {
    console.log(id)

    const startupScript = `
    #!/bin/bash
    aws s3 cp s3://shell-script-gvs/out.sh ~/out.sh
    cd ~
    chmod 777 out.sh
    ID=${id} sh out.sh
  `;
  console.log(startupScript)

let encoder = new TextEncoder();
let data = encoder.encode(startupScript);

const params = {
    ImageId: "ami-07caf09b362be10b8",
    InstanceType: "t2.micro",
    MinCount: 1,
    MaxCount: 1,
    KeyName: "fovus-key",
    SecurityGroupIds: ["sg-053e4d7d10e8d342a"],
    IamInstanceProfile: {
      Name: "ec2-admin",
    },
    UserData: btoa(String.fromCharCode.apply(null, data)),
  };

    let instanceId: string | null = null;

    await ec2Client.runInstances(params).promise()
        .then(data => {
            instanceId = data.Instances[0].InstanceId || null;
            console.log("Created instance", instanceId);
        })
        .catch(err => {
            console.error(err, err.stack);
        });

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

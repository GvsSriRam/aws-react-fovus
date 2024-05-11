import AWS from 'aws-sdk';

AWS.config.update({
  region: "us-east-1"
});

const s3 = new AWS.S3();

const upload = async (filename:string, file: File) => {
    let params = {
      Bucket: 'fovus-gvs',
      Key: filename,
      Body: file
    };
    
    s3.upload(params, function(err, data) {
      if (err) {
        console.error(`Error uploading file: ${err}`);
      } else {
        console.log(`Successfully uploaded file to ${data.Location}`);
      }
    });
}

export { upload };

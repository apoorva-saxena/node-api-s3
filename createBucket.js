const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");

const REGION = "us-west-2"; // Replace with your AWS region

const createBucket = async () => {
  const s3Client = new S3Client({
    region: REGION,
    credentials: fromIni({ profile: "default" }) // Use default profile from credentials file
  });

  const bucketName = "mantis-dupe";
  const params = {
    Bucket: bucketName
    // Remove ACL since BucketOwnerEnforced does not support ACLs
  };

  try {
    const command = new CreateBucketCommand(params);
    const data = await s3Client.send(command);
    console.log(`Bucket created successfully: ${data.Location}`);
  } catch (err) {
    console.error(`Error creating bucket: ${err.message}`);
  }
};

createBucket();

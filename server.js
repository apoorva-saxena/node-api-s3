// server.js
const express = require('express');
const AWS = require('./config');

const app = express();
const port = 3000;

const s3 = new AWS.S3();
const bucketName = 'your-unique-bucket-name';

// Endpoint to create a bucket
app.post('/create-bucket', async (req, res) => {
  try {
    const params = {
      Bucket: bucketName,
      ACL: 'public-read'
    };

    const data = await s3.createBucket(params).promise();
    res.status(200).send(`Bucket created successfully: ${data.Location}`);
  } catch (err) {
    res.status(500).send(`Error creating bucket: ${err.message}`);
  }
});

// Endpoint to list objects in the bucket
app.get('/list-objects', async (req, res) => {
  try {
    const params = {
      Bucket: bucketName
    };

    const data = await s3.listObjectsV2(params).promise();
    res.status(200).json(data.Contents);
  } catch (err) {
    res.status(500).send(`Error listing objects: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

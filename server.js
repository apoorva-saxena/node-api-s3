const express = require('express');

const app = express();
const port = 3000;

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

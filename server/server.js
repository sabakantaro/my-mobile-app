const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/signature', (req, res) => {
  const signature = req.body.signature;

  console.log('Received signature:', signature);

  res.send(`success \n signature: ${signature}`);

  return signature;
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get('/set-cookie', (req, res) => {
  res.cookie('user', 'John Doe', { httpOnly: true });
  res.status(200).json({ message: 'Cookie has been set' });
});

app.get('/get-cookie', (req, res) => {
  const userCookie = req.cookies.user || 'No cookie found';
  res.status(200).json({ cookie: userCookie });
});

app.get('/status/:code', (req, res) => {
  const { code } = req.params;
  const statusCode = parseInt(code, 10);
  switch (statusCode) {
    case 200:
      res.status(200).json({ message: 'OK' });
      break;
    case 201:
      res.status(201).json({ message: 'Created' });
      break;
    case 400:
      res.status(200).json({ message: 'Bad Request', statusCode: 400 });
      break;
    case 404:
      res.status(200).json({ message: 'Not Found',statusCode:200 });
      break;
    case 500:
      res.status(200).json({ message: 'Internal Server Error' , statusCode:500 });
      break;
    default:
      res.status(400).json({ message: 'Invalid Status Code' , statusCode:400});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

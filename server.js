require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
//uiURL from which requests are coming
//const uiURL = 'http://localhost:3000'
const uiURL = 'https://messager-react-ui.herokuapp.com'

var corsOptions = {
  origin: uiURL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const messageController = require('./controller/message.controller')

app.get('/', (req, res) => {
  res.send('Messager Node API with Express on Vercel');
});

app.get('/api/getMessages', (req, res) => {
  messageController.getMessages()
  .then(
    data => res.json(data)
  );
});

app.get('/api/getMessagesCount', (req, res) => {
  messageController.getMessagesCount()
  .then(
    data => res.json(data)
  );
});

app.post('/api/sendMessage', (req, res) => {
  messageController.sendMessage(req.body.Message)
  .then(
    data => res.json(data)
  );
});

app.listen(5000, () => {
  console.log('Running on port 5000.');
});

module.exports = app;
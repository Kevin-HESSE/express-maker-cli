<% if (useTypescript) { %>
import 'dotenv/config';
import { app } from './src/server';
  <% } else { %>
  require('dotenv').config();
  const app = require('./src/server');
  <% } %>

function start() {
  const PORT = process.env.PORT || <%= defaultPort %>;

  app.listen(PORT, () => {
    console.log('The server is running on : http://localhost:'+ PORT);
  });
}

start();
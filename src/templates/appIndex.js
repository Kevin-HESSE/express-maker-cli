const express = require('express');
const app = express();

<% if(isApiRest) { %> const cors = require('cors') <% } %>

const mainRouter = require('./routers/main.router');

<% if(viewEngine !== 'none'){ %> app.set('view engine', '<%= viewEngine %>');
  app.set('views', 'views');

  app.use(express.static('public')); <% } %>

<% if(isApiRest) { %>app.use(cors()); app.use(express.json()); <% } %>

app.use(mainRouter);

module.exports = app;
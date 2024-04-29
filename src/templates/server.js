<% if(useTypescript) { %>
import express from 'express';
  <% if(isApiRest) { %> import cors from 'cors' <% } %>

import { mainRouter } from './routers/main.router';
  <% } else { %>
  const express = require('express');
  <% if(isApiRest) { %> const cors = require('cors') <% } %>

  const mainRouter = require('./routers/main.router');
  <% } %>

const app = express();

<% if(hasViewEngine){ %> app.set('view engine', 'ejs');
  app.set('views', 'views');

  app.use(express.static('public')); <% } %>

<% if(isApiRest) { %>app.use(cors()); app.use(express.json()); <% } %>

app.use(mainRouter);

<% if (useTypescript) { %>
export { app };
  <% } else { %>
  module.exports = app;
  <% } %>

<% if(useTypescript) { %>
  import 'dotenv/config';
  import express from 'express';
  <% if(isApiRest) { %> import cors from 'cors' <% } %>

  import { mainRouter } from './src/routers/main.router';
<% } else { %>
  require('dotenv').config();
  const express = require('express');
  <% if(isApiRest) { %> const cors = require('cors') <% } %>

  const mainRouter = require('./src/routers/main.router');
<% } %>

const app = express();

const PORT = process.env.PORT || <%= port %>;

<% if(hasViewEngine){ %> app.set('view engine', 'ejs'); 
app.set('views', 'views'); 

app.use(express.static('public')); <% } %>

<% if(isApiRest) { %>app.use(cors()); app.use(express.json()); <% } %>

app.use(mainRouter);

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});

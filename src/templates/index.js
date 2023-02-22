require('dotenv').config();

const express = require('express');
const app = express();
<% if(isApiRest) { %> const cors = require('cors') <% } %>

const mainRouter = require('./<%= appDirectory %>/routers/main.router');

const PORT = process.env.PORT || <%= port %>;

<% if(hasViewEngine){ %> app.set('view engine', 'ejs'); 
app.set('views', 'views'); 

app.use(express.static('public')); <% } %>

<% if(isApiRest) { %>app.use(cors()); app.use(express.json()); <% } %>

app.use(mainRouter);

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});

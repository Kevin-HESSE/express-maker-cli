const express = require('express');
const app = express();

const mainRouter = require('./<%= appDirectory %>/routers/main.router');

<% if(hasViewEngine){ %> app.set('view engine', 'ejs'); 
app.set('views', 'views'); 

app.use(express.static('public')); <% } %>

<% if(isApiRest) { %> app.use(express.json()); <% } %>

app.use(mainRouter);

app.listen(3000, () => {
  console.log(`The server is running on : http://localhost:3000`);
});

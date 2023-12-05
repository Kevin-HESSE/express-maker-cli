<% if (useTypescript) { %>import { Request, Response } from 'express';  <% } %>

const mainController = {
  home: function(request<% if (useTypescript) { %>: Request <% } %>, response<% if (useTypescript) { %>: Response <% } %>){
    <% if(isApiRest) { %> response.json(`It's alive !`); <% } else { %>response.send(`<h1>It's alive !</h1>`); <% } %>
  }
}

<% if (useTypescript) { %>
  export { mainController };
<% } else { %>
  module.exports = mainController;
<% } %>

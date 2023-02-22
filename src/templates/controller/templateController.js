const mainController = {
  home: function(request, response){
    <% if(isApiRest) { %> response.json(`It's alive !`); <% } else { %>response.send(`It's alive !`); <% } %>
  }
}

module.exports = mainController;
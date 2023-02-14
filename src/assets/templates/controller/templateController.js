const mainController = {
  home: function(request, response){
    response.send(`It's alive !`);
  }
}

module.exports = mainController;
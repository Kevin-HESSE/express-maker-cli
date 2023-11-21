<% if (useTypescript) { %>
  import { Router } from 'express';
  import { mainController } from '../controllers/mainController';
<% } else { %>
  const { Router } = require('express');
  const mainController = require('../controllers/mainController');
<% } %>
const mainRouter = Router();

mainRouter.get('/', mainController.home);

<% if (useTypescript) { %>
  export { mainRouter };
<% } else { %>
  module.exports = mainRouter;
<% } %>

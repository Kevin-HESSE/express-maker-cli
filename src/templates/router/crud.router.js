const { Router } = require('express');
const <%= name %> = require('../models/<%= name %>');
const controller = require('../controllers/<%= name %>Controller');
const middleware = require('../middlewares/ParamRouterMiddleware');

const <%= name %>Controller = new controller(<%= name %>);
const <%= name %>Middleware = new middleware(<%= name %>);

const <%= name.toLowerCase() %>Router = Router();

<%= name.toLowerCase() %>Router.param('<%= name.toLowerCase() %>Id', <%= name %>Middleware.getParam);

<%= name.toLowerCase() %>Router.get('/', <%= name %>Controller.getAll);
<%= name.toLowerCase() %>Router.get('/:<%= name.toLowerCase() %>Id', <%= name %>Controller.getOne);
<%= name.toLowerCase() %>Router.post('/', <%= name %>Controller.createOne);
<%= name.toLowerCase() %>Router.put('/:<%= name.toLowerCase() %>Id', <%= name %>Controller.updateOne)
<%= name.toLowerCase() %>Router.delete('/:<%= name.toLowerCase() %>Id', <%= name %>Controller.deleteOne);

module.exports = <%= name.toLowerCase() %>Router;
const { Router } = require('express');
const { Car } = require('../models');
const controller = require('../controllers/CarController');
const middleware = require('../middlewares/RouterMiddelware');

const CarController = new controller(Car);
const CarMiddleware = new middleware(Car);

const carRouter = Router();

clientRouter.param('carId', CarMiddleware.getParam);

carRouter.get('/', CarController.getAll);
carRouter.get('/:carId', CarController.getOne);
carRouter.post('/', CarController.createOne);
carRouter.put('/:carId', CarController.updateOne)
carRouter.delete('/:cardId', CarController.deleteOne);

module.exports = carRouter;
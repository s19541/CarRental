const express = require('express');
const router = express.Router();

const carApiController = require('../../api/CarAPI');

router.get('/', carApiController.getCars);
router.get('/:carId', carApiController.getCarById);
router.post('/', carApiController.createCar);
router.put('/:carId', carApiController.updateCar);
router.delete('/:carId', carApiController.deleteCar);

module.exports = router;
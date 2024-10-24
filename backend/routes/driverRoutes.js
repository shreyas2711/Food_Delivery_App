const express = require('express');
const { CreateDrvier, GetDrivers } = require('../controllers/driversController');
const router = express.Router();
module.exports=(db)=>{
    router.post('/driver/create',CreateDrvier(db));
    router.get('/driver/show',GetDrivers(db));

    return router;
};



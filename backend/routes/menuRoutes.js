const express = require('express');
const { GetMenu, GetFoodSize } = require('../controllers/menuController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

module.exports=(db)=>{
    router.get('/menu/show',isAuthenticated(db),GetMenu(db));
    router.get('/foodsize/show',isAuthenticated(db),GetFoodSize(db));

    return router;
};

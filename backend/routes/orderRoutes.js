const express = require('express');
const { GetMenu, GetFoodSize } = require('../controllers/menuController');
const { isAuthenticated } = require('../middleware/auth');
const { CreateOrder, GetOrders, DeleteOrder, getTotalBillForOrder } = require('../controllers/orderController');
const router = express.Router();

module.exports=(db)=>{
    router.post('/order/create',isAuthenticated(db),CreateOrder(db));
    router.get('/order/show',isAuthenticated(db),GetOrders(db));
    router.get('/order/showbill',isAuthenticated(db),getTotalBillForOrder(db));
    router.delete('/order/delete',isAuthenticated(db),DeleteOrder(db));

    return router;
};

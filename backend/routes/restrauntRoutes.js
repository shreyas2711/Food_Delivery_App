const express = require('express');
const { CreateRestraunt, GetRestraunts } = require('../controllers/restrauntController');
const router = express.Router();
module.exports=(db)=>{
    router.post('/restraunt/create',CreateRestraunt(db));
    router.get('/restraunt/show',GetRestraunts(db));

    return router;
};
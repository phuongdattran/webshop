const express = require('express');
const router = express.Router();
const orderCtrl = require('../controller/order');
const auth = require('../middleware/auth');
const authfetch = require('../middleware/authfetch');

router.get('/all/:userId', authfetch, orderCtrl.getAllOrder);

router.get('/:id', authfetch, orderCtrl.getOneOrder);

router.post('/', orderCtrl.createOrder);

router.put('/:id', auth, orderCtrl.updateOrder);

router.delete('/:id', auth, orderCtrl.deleteOrder);


module.exports = router;
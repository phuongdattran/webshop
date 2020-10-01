const express = require('express');
const router = express.Router();
const shopCtrl = require('../controller/shop');
const auth = require('../middleware/auth');

router.get('/', shopCtrl.getAllProduct);

router.get('/:id', shopCtrl.getOneProduct);

router.post('/', shopCtrl.createProduct);

router.put('/:id', auth, shopCtrl.updateProduct);

router.delete('/:id', auth, shopCtrl.deleteProduct);

module.exports = router;
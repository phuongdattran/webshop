const express = require('express');
const router = express.Router();
const addressCtrl = require('../controller/address');
const auth = require('../middleware/auth');
const authfetch = require('../middleware/authfetch');

router.get('/list', authfetch,  addressCtrl.getAllAddress);

router.get('/:id', authfetch, addressCtrl.getOneAddress);

router.post('/', addressCtrl.createAddress);

router.put('/:id', auth, addressCtrl.updateAddress);

router.delete('/:id', auth, addressCtrl.deleteAddress);

module.exports = router;
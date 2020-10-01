const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');
const auth = require('../middleware/auth');
const authfetch = require('../middleware/authfetch');

router.get('/', auth, userCtrl.getAllUser);

router.get('/:id', authfetch, userCtrl.getOneUser);

router.post('/signup', userCtrl.createUser);

router.put('/:id', auth, userCtrl.updateUser);

router.delete('/:id', auth, userCtrl.deleteUser);

router.post('/signin', userCtrl.login);

module.exports = router;
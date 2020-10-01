const express = require('express');
const router = express.Router();
const newsletterCtrl = require('../controller/newsletter');


router.get('/', newsletterCtrl.getAllSub);

router.get('/:id', newsletterCtrl.getOneSub);

router.post('/', newsletterCtrl.createSub);

router.put('/:id', newsletterCtrl.updateSub);

router.delete('/:id', newsletterCtrl.deleteSub);

module.exports = router;
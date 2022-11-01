var express = require('express');
var router = express.Router();

const enqData = require("../controllers/enq_data.controllers.js");

router.post('/enq', enqData.create);

router.put('/enq/:id', enqData.update);

router.delete('/enq/:id', enqData.delete);
router.delete('/enq', enqData.deleteAll)
router.delete('/front/enq/:date/:enq', enqData.deleteWithDatePdsAndNumEnq)


router.get('/enq', enqData.findAll);
router.get('/enq/:id', enqData.findOne);
router.get('/front/enq/:date/:enq', enqData.findWithDatePdsAndNumEnq);


const rdvData = require("../controllers/rdv_data.controllers.js");

router.post('/rdv', rdvData.create);

router.put('/rdv/:id', rdvData.update);

router.delete('/rdv/:id', rdvData.delete);
router.delete('/rdv', rdvData.deleteAll)
router.delete('/front/rdv/:date/:enq', rdvData.deleteWithDatePdsAndNumEnq)


router.get('/rdv', rdvData.findAll);
router.get('/rdv/:id', rdvData.findOne);
router.get('/front/rdv/:date/:enq', rdvData.findWithDatePdsAndNumEnq);

module.exports = router;

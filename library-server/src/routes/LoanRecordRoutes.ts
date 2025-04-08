import express from 'express';
import LoanRecordController from '../controllers/LoanRecordController';

const router = express.Router();

router.get('/', LoanRecordController.getAllRecords);
router.post('/', LoanRecordController.createRecord);
router.put('/', LoanRecordController.updatedRecord);
router.post('/query', LoanRecordController.getRecordsByProperty);

export = router;
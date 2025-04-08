import express from "express";
import LibraryCardController from "../controllers/LibraryCardController";

const router = express.Router();

router.get('/:cardId', LibraryCardController.getLibraryCard);
router.post('/', LibraryCardController.createLibraryCard);

export = router;
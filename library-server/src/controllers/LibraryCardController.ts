import { Request, Response } from "express";
import { registerLibraryCard, findLibraryCard } from "../services/LibraryCardService";

import { ILibraryCard } from "../models/LibraryCard";

async function getLibraryCard(req: Request, res: Response) {
    const {cardId} = req.params;

    try {
        let libraryCard = await findLibraryCard(cardId);

        res.status(200).json({message: "Retrieved the users card", libraryCard});
    } catch(error) {
        res.status(500).json({message:"Unable to retrieve the Library Card"});
    }
}

async function createLibraryCard(req: Request, res: Response){
    const card:ILibraryCard = req.body;

    try {
        let libraryCard = await registerLibraryCard(card);
        res.status(201).json({message: "Generated the Library Card for the User", libraryCard});
    } catch(error) {
        res.status(500).json({message:"Unable to create Library Card at this moment"});
    }
}

export default { getLibraryCard, createLibraryCard};
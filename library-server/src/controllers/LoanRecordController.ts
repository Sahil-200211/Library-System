import { Request, Response } from "express";
import { findAllRecords, generateRecord, modifyRecord, queryRecords } from "../services/LoanRecordService";

async function createRecord(req: Request, res: Response) {
    let record = req.body;

    try {
        let createRecord = await generateRecord(record);
        res.status(201).json({message: "New Record generated", record: createRecord});
    } catch(error) {
        res.status(500).json({message:"Something went wrong", error});
    }
}

async function updatedRecord(req: Request, res: Response){
    let record = req.body;

    try {
        let updatedRecord = await modifyRecord(record);
        res.status(200).json({message:"Record updated Succesfully", record: updatedRecord});
    } catch(error) {
        res.status(500).json({message:"Something went wrong", error})
    }  
}

async function getAllRecords(req: Request, res: Response){
    try {
        let records = await findAllRecords();
        
        res.status(200).json({message:"Retrieved all Records", records});
    } catch(error) {
        res.status(500).json({message:"Unable to retrieve Records at this moment", error});
    }
}

async function getRecordsByProperty(req: Request, res: Response) {
    let param = req.body;

    try {
        let records = await queryRecords(param);
        res.status(200).json({message:"Retrieved records from your Query", records});
    } catch(error) {
        res.status(500).json({message:"Unable to retrieve records at this moment"});
    }
}

export default {getAllRecords, createRecord, updatedRecord, getRecordsByProperty};
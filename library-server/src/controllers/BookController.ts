import { Request, Response } from "express";
import { findAllBooks, registerBook, modifyBook, removeBook, queryBooks } from "../services/BookService";

import { IBook } from "../models/Books";
import { IBookModel } from "../daos/BookDao";

async function getAllBooks(req: Request, res: Response) {
    try {
    let books = await findAllBooks();
    res.status(200).json({message:"Retrived all Books", count:books.length, books});
    } catch (error:any) {
        res.status(500).json({message: "Unable to retrive the Books at this moment", error});
    }
} 

async function createBook(req: Request, res: Response) {
    let book=req.body;
    try {
        let savedBook = await registerBook(book);
        res.status(201).json({message:"Book created Successfully", savedBook});
    } catch(error:any) {
        res.status(500).json({message: "Unabe to create Book at this moment", error});
    }
}

async function updateBook(req: Request, res:Response) {
    let book=req.body;
    try{
        let updatedBook = await modifyBook(book);
        res.status(202).json({message:"Book updated Successfully", updatedBook});
    } catch(error:any) {
        res.status(500).json({message:"Unable to update book at this moment", error});
    }
}

async function deleteBook(req: Request, res: Response) {
    let {barcode}=req.params;
    try {
        let message = await removeBook(barcode);
        res.status(202).json({message});
    } catch(error:any) {
        res.status(500).json({message:"Unable to delete book at this moment"});
    }
}

async function searchForBooksByQuery(req:Request, res:Response) {
    let {title, barcode, author, description, subjec, genre, page = 1, limit = 25} = req.query;4

    let books = await queryBooks(
        Number(page),
        Number(limit),
        title as string,
        barcode as string,
        description as string,
        author as string,
        subjec as string,
        genre as string
    );

    res.status(200).json({message: "Retrived books from the query", page: books});
}

export default {getAllBooks, updateBook, createBook, deleteBook, searchForBooksByQuery};
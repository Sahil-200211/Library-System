import { Request, Response } from 'express';
import { findAllUsers, findUserById, removeUser, modifyUser } from '../services/UserService';
import { UserDoesNotExistError } from '../utils/LibraryErrors';

async function getAllUsers(req:Request, res:Response){
    try{
        let users = await findAllUsers();
        res.status(200).json({message: "Users retrieved successfully", users});
    } catch(error:any){
        res.status(500).json({message: "Unable to retrieve users at this moment", error: error.message});
    }
}

async function getUserById(req:Request, res:Response){
    const userId = req.params.userId;

    try{
        let user = await findUserById(userId);
        res.status(200).json({message: "User found successfully", user});
    } catch(error:any){
        if(error instanceof UserDoesNotExistError) {
            res.status(404).json({message: "User requested does not exist"});
        } else {
            res.status(500).json({message:"Could not find User", error: error.message});
        } 
    }
}

async function updateUser(req:Request, res:Response){
    const user = req.body;

    try {
        let updatedUser = await modifyUser(user);
        res.status(200).json({message: "User updated Successfully", user: updatedUser});
    } catch(error:any) {
        if(error instanceof UserDoesNotExistError) {
            res.status(404).json({message: "User requsted does not Exist"});
        }
        else {
            res.status(500).json({message: "Unable to update User at this moment",error: error.message});
        } 
    }
}

async function deleteUser(req:Request, res:Response){
    let userId:string = req.params.userId;

    try{
        await removeUser(userId);
        res.status(200).json({message:"User Deleted Successfully!"});
    } catch(error:any) {
        if(error instanceof UserDoesNotExistError){
            res.status(404).json({message: "User requested does not Exist"});
        } else {
            res.status(500).json({message:"Unable to delete user at this Moment", error: error.message});
        }
    }
}

export default {getAllUsers, getUserById, updateUser, deleteUser};
import bcrypt from 'bcrypt';
import {config} from '../config';
import UserDao, {IUserModel} from '../daos/UserDao';
import {IUser} from '../models/User';
import { UnableToSaveUserError,InvalidUsernameOrPasswordError, UserDoesNotExistError } from '../utils/LibraryErrors';

export async function register(user:IUser):Promise<IUserModel>{
    const ROUNDS = config.server.rounds;

    try
    {
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
        const saved = new UserDao({...user, password:hashedPassword});
        return await saved.save();
    }

    catch(error:any){
        throw new UnableToSaveUserError(error.message);
    }
}

export async function login(credentials:{email:string, password:string}):Promise<IUserModel>{
    const {email, password} = credentials;

    try{
        const user = await UserDao.findOne({email});

        if(!user){
            throw new InvalidUsernameOrPasswordError("Invalid Username or Password");
        } else {
            const validPassword: boolean = await bcrypt.compare(password, user.password);

            if(validPassword){
                return user;
            }
            else {
                throw new InvalidUsernameOrPasswordError("Invalid Username or Password");
            }
        }
    }catch(error:any){
        throw error;
    }
}

export async function findAllUsers():Promise<IUserModel[]>{
    try{
        const users = await UserDao.find();
        return users;
    } catch(error){
        return[];
    }
}

export async function findUserById(userId:string):Promise<IUserModel>{
    try{
        const user = await UserDao.findById(userId);

        if(user) return user;

        throw new UserDoesNotExistError("User does not Exist with this Id");
    } catch(error:any){
        throw error;
    }
}

export async function modifyUser(user:IUserModel): Promise<IUserModel> {
    try{
        let id =await UserDao.findByIdAndUpdate(user._id, user, {new:true});
        if(!id) throw new UserDoesNotExistError("User does not Exist");
        return user;
    } catch(error:any){
        throw error;
    }
}

export async function removeUser(userId:string):Promise<string>{
    try{
        let deleted = await UserDao.findByIdAndDelete(userId);
        if(!deleted) throw new UserDoesNotExistError("User does not Exist");
        return "User Deleted Successfully";
    } catch(error){
        throw error;
    }
}
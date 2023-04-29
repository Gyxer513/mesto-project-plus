import { NextFunction, Response, Request } from 'express';
import User from 'models/user';


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({}) 

}
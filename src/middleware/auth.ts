import { Request, Response, NextFunction, response } from "express";
const jwt = require('jsonwebtoken');

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: 'Precisa de um token!'});
    }

    const [, token] = authHeader.split(' ');

    try {
        await jwt.verify(token, process.env.JWT_KEY)
        next();
    } catch (error) {
        return response.status(401).json({ message: 'Token inválido!' });
    }
};
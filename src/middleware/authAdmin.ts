import { Request, Response, NextFunction, response } from "express";
const jwt = require('jsonwebtoken');

export const authAdmin = async(req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({message: 'Precisa de um token!'});
    }

    const [, token] = authHeader.split(' ');

    try {
        await jwt.verify(token, process.env.JWT_KEY)
        if (jwt.decode(token, process.env.JWT_KEY).type == 'admin')
            next();
        else
            return res.status(401).json({message: 'Não é admin!'});
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido!' });
    }
};
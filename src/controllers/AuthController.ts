// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { registerService, loginService } from '../services/AuthService';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const result = await registerService({ username, email, password });
        res.status(201).json(result);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginService({ email, password });
        res.status(200).json(result);
    } catch (error:any) {
        res.status(401).json({ message: error.message });
    }
};

export const logout = (req: Request, res: Response) => {
    // Implementar lógica de logout si es necesario
    res.status(200).json({ message: "Logged out successfully" });
};
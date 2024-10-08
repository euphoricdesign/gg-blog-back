// src/services/AuthService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import AppDataSource from "../config/data-source";

const userRepository = AppDataSource.getRepository(User);

export const registerService = async ({ username, email, password }) => {
    const existingUser = await userRepository.findOne({ where: [{ username }, { email }] });
    if (existingUser) {
        throw new Error("Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ username, email, password: hashedPassword });
    await userRepository.save(user);

    return { message: "User registered successfully" };
};

export const loginService = async ({ email, password }) => {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
};
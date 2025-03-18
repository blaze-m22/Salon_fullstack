import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import AdminModel from '../models/admin_model.js';
import CustomerModel from '../models/customer_model.js';

export const adminSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await AdminModel.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "user doesnt exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'cred', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}

export const adminSignUp = async (req, res) => {
    const { email, password, confirmPassword, userName } = req.body;
    console.log("recieved responce: ", req.body);

    try {
        const existingUser = await AdminModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "user already exists" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await AdminModel.create({ email, password: hashedPassword, name: userName });

        const token = jwt.sign({ email: result.email, id: result._id }, 'cred', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const userSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await CustomerModel.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "user doesnt exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'cred', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}

export const userSignUp = async (req, res) => {
    const { email, password, confirmPassword, userName } = req.body;

    try {
        const existingUser = await CustomerModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "user already exists" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await CustomerModel.create({ email, password: hashedPassword, name: userName });

        const token = jwt.sign({ email: result.email, id: result._id }, 'cred', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
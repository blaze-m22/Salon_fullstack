import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import AdminModel from '../models/admin_model.js';
import CustomerModel from '../models/customer_model.js';
import mongoose from 'mongoose';

export const adminSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await AdminModel.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "Account doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'cred', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const adminSignUp = async (req, res) => {
    const { email, password, confirmPassword, userName } = req.body;
    console.log("recieved responce: ", req.body);

    try {
        const existingUser = await AdminModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "Admin already exists" });

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

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'cred', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const userSignUp = async (req, res) => {
    const { email, password, confirmPassword, userName } = req.body;

    try {
        const existingUser = await CustomerModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "A user with this email already exists!" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await CustomerModel.create({ email, password: hashedPassword, name: userName });

        const token = jwt.sign({ email: result.email, id: result._id }, 'cred', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateUserProfile = async (req, res) => {
    const { id: _id } = req.params;

    const { name, email, profilePicture, phoneNumber, location } = req.body;

    if (!req.userId) return res.status(401).json({ message: "Unauthorized. Please log in." });

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No user with that id');

    console.log("Received body:", req.body); console.log(req.method);
    console.log("Received id:", _id);

    try {
        const updatedUser = await CustomerModel.findByIdAndUpdate(
            _id,
            { name, email, profilePicture, phoneNumber, location },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
}
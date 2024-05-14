// /src/lib/users.js
import { Users } from "./mongodb";
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export const getAllUsers = async () => {
  const users = await (await Users()).find({}).toArray();
  return users;
};

export const getUserByEmail = async (userEmail) => {
  const user = await (await Users()).findOne({ email: userEmail})
  return user
}

export const createUser = async (newUser) => {
  const user = await (await Users()).insertOne(newUser);
  return user;
};

export const loginUser = async (email, password) => {
  const user = await (await Users()).findOne({ email: email });
  if (user) {
    // Here, you would typically compare the hashed password stored in the database
    // with the hashed version of the password provided by the user

    // For demonstration purposes, assuming the password is stored in plain text
    if (user.password === password) {
      return user; // User authenticated successfully
    } else {
      return null; // Incorrect password
    }
  } else {
    return null; // User not found
  }
};

export const getUserEmailFromCookie = (cookies) => {
  const token = cookies.get("session_id").value;
  const secretKey = import.meta.env.AUTH_SECRET
  if (!token) {
    return null;
  }
  
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken.user.email;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const verifySessionToken = async (token) => {
  try {
    const secretKey = import.meta.env.AUTH_SECRET;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Session token verification failed');
  }
}

export const generateSessionToken = (user) => {
  const payload = { user };
  const secretKey = import.meta.env.AUTH_SECRET;
  const token = jwt.sign(payload, secretKey);
  return token;
}
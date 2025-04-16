import { registerSchema } from "../dtos/register.schema.js";
import jwt from "jsonwebtoken";
import userService from "./user.service.js";
import {
    ACCES_TOKEN_EXPIRE_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE_TIME,
    REFRESH_TOKEN_SECRET,
  } from "../../configs/jwt.config.js";
import { BaseException } from "../../errors/base.error.js";
import { loginSchema } from "../dtos/login.schema.js";

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await userService.findUserById(id);
  res.send({
    message:"success",
    data:user
});
};


export const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  console.log(error,value);
  
  if (error) {
    throw new BaseException(error.message,400);
    
  }
  const newUser = await userService.registerUser(req.body);
  const payload={ role: newUser.role, id: newUser.id }
  
  const accessToken = jwt.sign(
    payload,
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCES_TOKEN_EXPIRE_TIME,
    }
  );
  const refreshToken = jwt.sign(
    payload,
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    }
  );
  res.cookie("accessToken", accessToken, {
    maxAge: +ACCES_TOKEN_EXPIRE_TIME * 1000,
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: +REFRESH_TOKEN_EXPIRE_TIME * 1000,
    httpOnly: true,
  });
  
  res.cookie("user", JSON.stringify(newUser));
  const data={newUser,tokens:{accessToken,refreshToken}}
  res.status(201).send({
    message: "Yaratildi",
    data: newUser,
  });
};

export const login=async (req,res) => {
  const {error,value}=loginSchema.validate(req.body)

  if (error) {
    throw new BaseException(error.message,400);
  }

  const user=await userService.loginUser(req.body)

  const accessToken = jwt.sign(
    { role: user.role, id: user.id },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCES_TOKEN_EXPIRE_TIME,
    }
  );
  const refreshToken = jwt.sign(
    { role: user.role, id: user.id },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    }
  );

  res.cookie("accessToken", accessToken, {
    maxAge: +ACCES_TOKEN_EXPIRE_TIME * 1000,
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: +REFRESH_TOKEN_EXPIRE_TIME * 1000,
    httpOnly: true,
  });

  const data={user,tokens:{accessToken,refreshToken}}

  res.cookie("user", JSON.stringify(user));
  res.send({
    message: "success",
    data: user,
  })
}

export const deleteUser = async (req, res) => {
  const id = req.params.id; 
  const user = await userService.deleteUserById(id);
  res.send(user);
};

export const updateUser=async (req,res) => {
  const id = req.params.id; 
  const {email,name,balance,income}=req.body
  const user = await userService.updateUserById(id,{email,name,balance,income});
  res.send({
    message:"succes",
    updatedUser:user
  });
}
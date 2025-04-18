import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCES_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE_TIME,
} from "../configs/jwt.config.js";
import { BaseException } from "../errors/base.error.js";
import { isValidObjectId } from "mongoose";

export const Protected = (isProtected) => {
  return (req, res, next) => {
    if (!isProtected) {
      
      req.role = "USER";
      return next();
    }
    
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken && !refreshToken) {
      return res.redirect("/user/login");
    }
    
    if (!accessToken && refreshToken) {
      try {
        const { role, id } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const payload = { role, id };

        const newAccessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
          expiresIn: ACCES_TOKEN_EXPIRE_TIME,
        });
        const newRefreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
          expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        });

        res.cookie("accessToken", newAccessToken, {
          maxAge: +ACCES_TOKEN_EXPIRE_TIME * 1000,
          httpOnly: true,
        });

        res.cookie("refreshToken", newRefreshToken, {
          maxAge: +REFRESH_TOKEN_EXPIRE_TIME * 1000,
          httpOnly: true,
        });

        const data = { id, role };
        res.cookie("user", JSON.stringify(data));

      } catch (err) {
        return next(new BaseException("Refresh token notogri", 401));
      }
    }

    try {
      const decodedData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

      req.role = decodedData.role;
      req.user = decodedData; 
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return next(new BaseException("Token muddati eskirgan", 406));
      } else if (err instanceof jwt.JsonWebTokenError) {
        return next(
          new BaseException("JWT token xato formatda yuborildi", 400)
        );
      } else if (err instanceof jwt.NotBeforeError) {
        return next(new BaseException("Token hali kuchga kirmagan", 409));
      } else {
        next(err);
      }
    }
  };
};


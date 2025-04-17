import { ROLES } from "../constants/roles.constants.js";
import { BaseException } from "../errors/base.error.js";

export const CheckRoles = (possibleRoles) => {
  return (req, res, next) => {
    if (possibleRoles.includes(ROLES.ALL)) {
      return next();
    }
    const userRole = req.role;
    
    if (!possibleRoles.includes(userRole)) {
      return next(new BaseException("Sizga bu amalni bajarishga ruhsat yo'q"));
    }
    next();
  };
};

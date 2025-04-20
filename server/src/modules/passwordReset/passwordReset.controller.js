import { createResetRecord, generateResetCode, sendResetEmail, validateResetCode } from "./passwordReset.helper.js";
import bcrypt from "bcrypt";
import User from "../user/user.model.js";
import PasswordReset from "./passwordReset.model.js";

export const requestPasswordReset = async (req, res) => {
    try {
      const { email } = req.body;
      

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });
      }
  
      const code = generateResetCode()
      await createResetRecord(user._id, code);
      await sendResetEmail(email, code);
  
      res.json({ 
        success: true,
        message: "Parol tiklash kodi emailga yuborildi"
      });
  
    } catch (error) {
      res.status(500).json({ 
        message: error.message 
      });
    }
  };


  export const verifyAndResetPassword = async (req, res) => {
    try {
      const { email, code, newPassword } = req.body;
      
      const isValid = await validateResetCode(email, code);
      if (!isValid) {
        return res.status(400).json({ 
          success: false, 
          message: "Yaroqsiz yoki eskirgan kod" 
        });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.findOneAndUpdate(
        { email },
        { password: hashedPassword }
      );  
      await PasswordReset.deleteOne({ email });
      
      res.json({ 
        success: true,
        message: "Parol muvaffaqiyatli o'zgartirildi" 
      });
  
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  };
import { transporter } from '../../configs/mail.config.js';
import PasswordReset from './passwordReset.model.js';

export const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 ta raqam
  };
  export const createResetRecord = async (userId, code) => {
    await PasswordReset.deleteMany({ userId });
    
    return await PasswordReset.create({
      userId,
      code,
      expiresAt: new Date(Date.now() + 600000) // 10 minut
    });
  };

  export const validateResetCode = async (userId, code) => {
    const record = await PasswordReset.findOne({ 
      userId, 
      code,
      expiresAt: { $gt: new Date() } 
    });
    
    return !!record; 
  };

  export const sendResetEmail = async (email, code) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Parolni tiklash kodingiz',
      html: `
        <h3>Parolni tiklash kodingiz: <strong>${code}</strong></h3>
        <p>Bu kod 10 daqiqa davomida amal qiladi</p>
        <p>Agar siz bu so'rovni yubormagan bo'lsangiz, e'tibor bermang.</p>
      `
    };
    await transporter.sendMail(mailOptions);
  };
import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  code: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 600000) 
  }
}, { timestamps: true });

passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

export default PasswordReset;

// export const sendResetEmail = async (email, code) => {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Parolni tiklash kodingiz',
//       html: `
//         <h3>Parolni tiklash kodingiz: <strong>${code}</strong></h3>
//         <p>Bu kod 10 daqiqa davomida amal qiladi</p>
//         <p>Agar siz bu so'rovni yubormagan bo'lsangiz, e'tibor bermang.</p>
//       `
//     };
//     await transporter.sendMail(mailOptions);
//   };
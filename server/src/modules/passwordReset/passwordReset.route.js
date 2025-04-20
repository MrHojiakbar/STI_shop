// auth.routes.js
import {Router} from 'express';
import { 
  requestPasswordReset,
  verifyAndResetPassword
} from './passwordReset.controller.js';

const passwordResetrouter = Router();

passwordResetrouter.post('/request-reset', requestPasswordReset);
passwordResetrouter.post('/create-password', verifyAndResetPassword);

export default passwordResetrouter;
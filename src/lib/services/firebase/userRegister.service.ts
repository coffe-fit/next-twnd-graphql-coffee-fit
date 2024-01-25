import {
  createUserWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from './config';

const userRegister = async (email: string, password: string): Promise<User> => {
  const credenciales = await createUserWithEmailAndPassword(auth, email, password);
  return credenciales.user;
};

export {
  GoogleAuthProvider,
  FacebookAuthProvider,
  userRegister
};

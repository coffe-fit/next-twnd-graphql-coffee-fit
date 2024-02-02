export { 
  auth,
  // db
 } from '../firebase/config';

export {
  userRegister,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendVerificationEmail,
  handleVerification,
  handleAuthStateChanged,
  handleSignInWithPopup
} from '../firebase/userRegister.service';
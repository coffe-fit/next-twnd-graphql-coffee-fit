import {
  createUserWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './config';

const userRegister = async (email: string, password: string): Promise<User> => {
  try {
    const credenciales = await createUserWithEmailAndPassword(auth, email, password);
    return credenciales.user;
  } catch (error: any) {
    if (error.code === 'auth/invalid-email') throw {code: 100};
    throw new Error(error);
  }
};

// Función para enviar el enlace de confirmación por correo electrónico
const sendVerificationEmail = async (email:any) => {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: `${process.env.NEXT_PUBLIC_URL}?email=${email}`, // La URL a la que se redirigirá al usuario después de confirmar el correo electrónico
      handleCodeInApp: true,
    });

    // Guarda el correo electrónico en el almacenamiento local para recuperarlo después de la redirección
    localStorage.setItem('emailForSignIn', email);
    console.log('Correo de verificación enviado. Revise ');
  } catch (error: any) {
    console.error('sendVerificationEmail', error);

    if (error.code === 'auth/invalid-email') throw {code: 'auth/invalid-email'};
    if (error.code === 'auth/quota-exceeded') throw {code: 'auth/quota-exceeded'};
    throw {code: 0}
  }
};

// Función para manejar la verificación después de hacer clic en el enlace
const handleVerification = async (email:any) => {  
  if (email && isSignInWithEmailLink(auth, window.location.href)) {
    try {
      let response: any = await signInWithEmailLink(auth, email, window.location.href);
      return response.user;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
};
const handleAuthStateChanged = (handleBack: (user:any) => void) => {


  const onSuscribe = onAuthStateChanged(auth, async (user: any) => {
    console.log(user, 'before');
    
    // if (email !== '') {
    //   user = await handleVerification(email);
    // };
    console.log(user, 'after');
    if (user) {
      handleBack(user)
    };
  });
}
const handleSignInWithPopup = async (provider: 'google'| 'facebook')=>{

  let _provider: any;
  if (provider === 'google') _provider = new GoogleAuthProvider();
  if (provider === 'facebook') _provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, _provider)
  console.log(result);
  
  return result
}


export {
  GoogleAuthProvider,
  FacebookAuthProvider,
  userRegister,
  sendVerificationEmail,
  handleVerification,
  handleAuthStateChanged,
  handleSignInWithPopup
};

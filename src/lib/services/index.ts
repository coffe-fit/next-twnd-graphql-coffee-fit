// AUTH
export { 
  auth,
  userRegister,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendVerificationEmail,
  handleVerification,
  handleAuthStateChanged,
  handleSignInWithPopup

 } from './auth';

//  RUTINES
export { RutineFindAllByUserId } from './graphql/rutines/findAllByUserId.service';
export { getRutineOrderType } from './graphql/rutines/getActualRutineOrderRutineType.service';
export { getRutineOrderDay } from './graphql/rutines/getActualRutineOrderDays.service';
export { getRutineTypes } from './graphql/rutines/getRutineTypes.services';

// EXERCISES
export { exerciseFindExcerciseByRutine } from './graphql/exercises/findExerciseByRutine.service';

// USERS
export { findAllByRoleClient } from './graphql/users/findAllByRoleClient.service';


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
export { exerciseFindExcerciseByRutineTypeId } from './graphql/exercises/findExerciseByRutineType.service';

// USERS
export { findAllByRoleClient } from './graphql/users/findAllByRoleClient.service';

// PROGRESS
export {  progress_create } from './graphql/progress/create.service';
export { progress_find_by_user_id } from './graphql/progress/findByUserId.service';
export { progress_update } from './graphql/progress/update.service';


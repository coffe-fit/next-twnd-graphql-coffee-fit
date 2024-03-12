
/**
 * @function removeAccents
 * @param {string} text The text is the value what is received
 * @description This function helps to convert special characters
 */
export const removeAccents = (text: string) => {
  return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
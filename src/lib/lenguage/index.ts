import español from './español.json';

export const language = (language: 'español') => {
  if(language === 'español') return español
  return español
}
export const translateString = (_language: any, text: string) => {
  const { rutineType, exercises, roles, ...errorSuccessMessages } = _language;

  // Verificar si el texto está presente directamente en el objeto _language
  if (errorSuccessMessages[text]) return errorSuccessMessages[text];

  // Verificar si el texto es una clave en rutineType, exercises o roles
  if (text in rutineType) return rutineType[text as keyof typeof rutineType];
  if (text in exercises) return exercises[text as keyof typeof exercises];
  if (text in roles) return roles[text as keyof typeof roles];

  // Si no se encuentra en ninguna de las anteriores, devolver el texto original
  return text;
};
const customSessionStorage = () => {
  const secret = process.env.NEXT_PUBLIC_SESSION_STORAGE_SECRET;

  const encodeData = (data: any, secret: string) => {
    const encodedData = JSON.stringify(data);
    // Aquí puedes aplicar cualquier algoritmo de cifrado que desees
    // En este ejemplo, simplemente se concatena el secreto al final de los datos
    return encodedData + secret;
  };

  const decodeData = (encodedData: string, secret: string) => {
    // Elimina el secreto para obtener los datos originales
    const data = encodedData.replace(secret, '');
    return JSON.parse(data);
  };

  const setItem = (key: string, data: any) => {
    const encodedData = encodeData(data, secret || '');
    const encodedKey = encodeData(key, secret || '');
    sessionStorage.setItem(encodedKey, encodedData);
  };

  const getItem = (key: string) => {
    try {
      const decodeKey = encodeData(key, secret || '');
      const encodedData = sessionStorage.getItem(decodeKey) || '';

      return decodeData(encodedData, secret || '');
    } catch (error) {
      return undefined
    }
  };

  return { setItem, getItem };
};

export default customSessionStorage;
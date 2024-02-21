
import jwt from 'jsonwebtoken';

// Clave secreta para firmar y verificar los tokens
export const valitateToken = (token: string)=>{
  const JWT_SECRET: string | undefined = process.env.NEXT_PUBLIC_JWT_SECRET;
  try {
    const decoded = jwt.verify(token, JWT_SECRET || '');
    return decoded as unknown as { roleName: string  };
  } catch (error) {
    return null;
  }
}
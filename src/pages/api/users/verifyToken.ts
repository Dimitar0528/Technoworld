import jwt from 'jsonwebtoken';

const secretKey = import.meta.env.JWT_SECRET_KEY! as string

// Middleware function for verifying JWT tokens
export async function verifyToken(request:Request) {
  const cookies = request.headers.get('cookie');
  if (!cookies) return null;

  const tokenCookie = cookies.split(';').find((cookie) => cookie.trim().startsWith('_jwt'));
  if (!tokenCookie) return null;

  const token = tokenCookie.split('=')[1].trim(); // Extract the token

  try {
        const decodedUserToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    return decodedUserToken;
  } catch (error) {
    throw new Error('Invalid or expired JWT token');  
  }
}

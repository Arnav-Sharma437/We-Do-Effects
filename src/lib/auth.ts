import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-dev-only-do-not-use-in-prod';
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

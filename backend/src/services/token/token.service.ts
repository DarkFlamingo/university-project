import { decodeJwt, SignJWT, generateSecret, JWTPayload } from 'jose';
import { TokenPayload } from '~/common/types/types';
import { ENV } from '~/common/enums/app/env.enum';
import { JWT_SIGNING_ALGORITHM } from '~/common/constants/constants';

class Token {
  public async create(data: TokenPayload): Promise<string> {
    const secretKey = await generateSecret(JWT_SIGNING_ALGORITHM);

    return new SignJWT(data)
      .setProtectedHeader({ alg: JWT_SIGNING_ALGORITHM })
      .setExpirationTime(ENV.JWT.EXPIRES_IN)
      .sign(secretKey);
  }

  public decode<T>(token: string): T {
    const data = decodeJwt(token);
    return data as JWTPayload & T;
  }
}

export { Token };

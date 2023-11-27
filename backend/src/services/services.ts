import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';

const token = new Token();

const encrypt = new Encrypt({
  salt: USER_PASSWORD_SALT_ROUNDS,
});

const user = new User({
  userRepository,
  encryptService: encrypt,
});

const auth = new Auth({
  userRepository,
  userService: user,
  tokenService: token,
  encryptService: encrypt,
});
export { user, auth, encrypt, token };

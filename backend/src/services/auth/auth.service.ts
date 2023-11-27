import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  TokenPayload,
} from '~/common/types/types';

import {
  user as userServ,
  encrypt as encryptServ,
  token as tokenServ,
} from '~/services/services';
import { user as userRep } from '~/data/repositories/repositories';
import { User as UserEntity } from '~/entities/user/user.entity';
import { UserError } from '~/exceptions/exceptions';
import { HttpCode, ExceptionMessage } from '~/common/enums/enums';

type Constructor = {
  userRepository: typeof userRep;
  userService: typeof userServ;
  tokenService: typeof tokenServ;
  encryptService: typeof encryptServ;
};

class Auth {
  #userRepository: typeof userRep;
  #userService: typeof userServ;
  #tokenService: typeof tokenServ;
  #encryptService: typeof encryptServ;

  constructor({
    userRepository,
    userService,
    encryptService,
    tokenService,
  }: Constructor) {
    this.#userRepository = userRepository;
    this.#userService = userService;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
  }

  async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const newUser = await this.#userService.create(userRequestDto);
    return this.login(newUser.id);
  }

  signIn(userRequestDto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.verifyLoginCredentials(userRequestDto);
  }

  async login(userId: string): Promise<UserSignInResponseDto> {
    const { id, email } = (await this.#userRepository.getById(
      userId,
    )) as UserEntity;

    const token = await this.#tokenService.create({
      userId: id,
    });

    return {
      user: {
        id,
        email,
      },
      token,
    };
  }

  async verifyLoginCredentials(
    verifyUserDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const { email, password } = verifyUserDto;

    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      throw new UserError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_EMAIL,
      });
    }

    const isEqualPassword = await this.#encryptService.checkIsSame(
      password,
      user.passwordSalt,
      user.passwordHash,
    );

    if (!isEqualPassword) {
      throw new UserError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
      });
    }

    return this.login(user.id);
  }

  public async getCurrentUserData(
    token: string,
  ): Promise<UserSignInResponseDto> {
    try {
      const { userId } = this.#tokenService.decode<TokenPayload>(token);

      const userData = await this.login(userId);

      if (!userData) {
        throw new Error();
      }

      return userData;
    } catch {
      throw new UserError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.INVALID_TOKEN,
      });
    }
  }
}

export { Auth };

import {
  UserSignUpRequestDto,
  UserByIdResponseDto,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { User as UserEntity } from '~/entities/entities';
import { encrypt as encryptServ } from '~/services/services';

type Constructor = {
  userRepository: typeof userRep;
  encryptService: typeof encryptServ;
};

class User {
  #userRepository: typeof userRep;
  #encryptService: typeof encryptServ;

  constructor({ userRepository, encryptService }: Constructor) {
    this.#userRepository = userRepository;
    this.#encryptService = encryptService;
  }

  async getAll(): Promise<UserByIdResponseDto[]> {
    const users = await this.#userRepository.getAll();

    return users.map((m) => ({
      id: m.id,
      email: m.email,
    }));
  }

  async getUserById(userId: string): Promise<UserByIdResponseDto | null> {
    const user = await this.#userRepository.getById(userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async create({
    email,
    password,
    firstname,
    lastname,
  }: UserSignUpRequestDto): Promise<UserByIdResponseDto> {
    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );

    const user = UserEntity.createNew({
      email,
      passwordSalt,
      passwordHash,
      firstname,
      lastname,
    });

    return this.#userRepository.create(user);
  }
}

export { User };

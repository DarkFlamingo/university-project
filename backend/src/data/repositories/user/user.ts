import { User as UserM } from '~/data/models/models';
import { User as UserEntity } from '~/entities/entities';
import { getFormattedISODate } from '~/helpers/helpers';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.#UserModel.query();

    return users.map(User.modelToEntity);
  }

  async getById(id: string): Promise<UserEntity | null> {
    const user = await this.#UserModel.query().findById(id);

    if (!user) {
      return null;
    }

    return User.modelToEntity(user);
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.#UserModel
      .query()
      .select()
      .where({ email })
      .first();

    if (!user) {
      return null;
    }

    return User.modelToEntity(user);
  }

  async create(user: UserEntity): Promise<UserM> {
    const {
      id,
      email,
      passwordSalt,
      passwordHash,
      createdAt,
      firstname,
      lastname,
    } = user;

    return this.#UserModel.query().insert({
      id,
      email,
      passwordSalt,
      passwordHash,
      createdAt: getFormattedISODate(createdAt),
      firstname,
      lastname,
    });
  }

  public static modelToEntity(model: UserM): UserEntity {
    return UserEntity.initialize({
      id: model.id,
      email: model.email,
      passwordHash: model.passwordHash,
      passwordSalt: model.passwordSalt,
      createdAt: new Date(model.createdAt),
      firstname: model.firstname,
      lastname: model.lastname,
    });
  }
}

export { User };

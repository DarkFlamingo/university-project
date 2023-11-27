import { getRandomId } from '~/helpers/helpers';

class User {
  public id: string;
  public email: string;
  public passwordHash: string;
  public passwordSalt: string;
  public createdAt: Date;
  public firstname: string;
  public lastname: string;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
    firstname,
    lastname,
  }: {
    id: string;
    email: string;
    createdAt: Date;
    passwordHash: string;
    passwordSalt: string;
    firstname: string;
    lastname: string;
  }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.createdAt = createdAt;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
    firstname,
    lastname,
  }: {
    id: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
    firstname: string;
    lastname: string;
  }): User {
    return new User({
      id,
      email,
      passwordHash,
      passwordSalt,
      createdAt,
      firstname,
      lastname,
    });
  }

  public static createNew({
    email,
    passwordHash,
    passwordSalt,
    firstname,
    lastname,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstname: string;
    lastname: string;
  }): User {
    return new User({
      id: getRandomId(),
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
      firstname,
      lastname,
    });
  }
}

export { User };

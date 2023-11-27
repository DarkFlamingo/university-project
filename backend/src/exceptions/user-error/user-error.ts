import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

type Constructor = {
  status?: HttpCode;
  message?: string;
};

const DEFAULT_MESSAGE = ExceptionMessage.USER_EXISTS;

class UserError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.UNAUTHORIZED,
    message = DEFAULT_MESSAGE,
  }: Constructor = {}) {
    super(message);
    this.status = status;
  }
}

export { UserError };

import { HttpCode, CustomExceptionName } from '~/common/enums/enums';

const DEFAULT_MESSAGE = 'Network Error';

class HttpError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);

    this.status = status;
    this.name = CustomExceptionName.HTTP_ERROR;
  }
}

export { HttpError };

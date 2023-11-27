import {
  ApiPath,
  AuthApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserByIdResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.AUTH, AuthApiPath.SIGN_UP),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.AUTH, AuthApiPath.SIGN_IN),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getCurrentUser(): Promise<UserByIdResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.AUTH, AuthApiPath.ROOT),
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { AuthApi };

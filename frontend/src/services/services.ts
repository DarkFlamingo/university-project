import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { Storage } from './storage/storage.service';

const storage = new Storage({ storage: window.localStorage });

const http = new Http({
  storage,
});

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export { authApi, storage };

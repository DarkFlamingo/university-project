import { ApiPath, AuthApiPath, ENV } from '~/common/enums/enums';

const WHITE_ROUTES = [
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
];

export { WHITE_ROUTES };

import { User as UserModel } from '~/data/models/models';
import { User } from './user/user';

const user = new User({
  UserModel,
});

export { user };

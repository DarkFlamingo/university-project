import { User as UserModel, CPU as CPUModel } from '~/data/models/models';
import { User } from './user/user.repository';
import { CPU } from './cpu/cpu.repository';

const user = new User({
  UserModel,
});

const cpu = new CPU({
  CPUModel,
});

export { user, cpu };

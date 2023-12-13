import {
  User as UserModel,
  CPU as CPUModel,
  GPU as GPUModel,
  Cooler as CoolerModel,
  Motherboard as MotherboardModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { CPU } from './cpu/cpu.repository';
import { Cooler } from './cooler/cooler.repository';
import { Motherboard } from './motherboard/motherboard.repository';
import { GPU } from './gpu/gpu.repository';

const user = new User({
  UserModel,
});

const cpu = new CPU({
  CPUModel,
});

const cooler = new Cooler({
  CoolerModel,
});

const motherboard = new Motherboard({
  MotherboardModel,
});

const gpu = new GPU({
  GPUModel,
});

export { user, cpu, cooler, motherboard, gpu };

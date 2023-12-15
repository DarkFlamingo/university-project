import {
  user as userRepository,
  cpu as cpuRepository,
  cooler as coolerRepository,
  motherboard as motherboardRepository,
  gpu as gpuRepository,
  ram as ramRepository,
  storage as storageRepository,
  powerSupply as powerSupplyRepository,
  pcCase as pcCaseRepository,
} from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { CPU } from './cpu/cpu.service';
import { Cooler } from './cooler/cooler.service';
import { Motherboard } from './motherboard/motherboard.service';
import { GPU } from './gpu/gpu.service';
import { RAM } from './ram/ram.service';
import { Storage } from './storage/storage.service';
import { PowerSupply } from './power-supply/power-supply.service';
import { PcCase } from './pc-case/pc-case.service';
import { Price } from './price/price';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';

const token = new Token();

const encrypt = new Encrypt({
  salt: USER_PASSWORD_SALT_ROUNDS,
});

const cpu = new CPU({
  cpuRepository,
});

const cooler = new Cooler({
  coolerRepository,
});

const motherboard = new Motherboard({
  motherboardRepository,
});

const gpu = new GPU({
  gpuRepository,
});

const ram = new RAM({
  ramRepository,
});

const storage = new Storage({
  storageRepository,
});

const powerSupply = new PowerSupply({
  powerSupplyRepository,
});

const pcCase = new PcCase({
  pcCaseRepository,
});

const user = new User({
  userRepository,
  encryptService: encrypt,
});

const auth = new Auth({
  userRepository,
  userService: user,
  tokenService: token,
  encryptService: encrypt,
});

const price = new Price({
  cpuRepository,
  coolerRepository,
  motherboardRepository,
  gpuRepository,
  ramRepository,
  storageRepository,
  powerSupplyRepository,
  pcCaseRepository,
});

export {
  user,
  auth,
  encrypt,
  token,
  cpu,
  cooler,
  motherboard,
  gpu,
  ram,
  storage,
  powerSupply,
  pcCase,
  price,
};

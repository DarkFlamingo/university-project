import {
  User as UserModel,
  CPU as CPUModel,
  GPU as GPUModel,
  Cooler as CoolerModel,
  Motherboard as MotherboardModel,
  RAM as RAMModel,
  Storage as StorageModel,
  PowerSupply as PowerSupplyModel,
  PcCase as PcCaseModel,
  Guide as GuideModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { CPU } from './cpu/cpu.repository';
import { Cooler } from './cooler/cooler.repository';
import { Motherboard } from './motherboard/motherboard.repository';
import { GPU } from './gpu/gpu.repository';
import { RAM } from './ram/ram.repository';
import { Storage } from './storage/storage.repository';
import { PowerSupply } from './power-supply/power-supply.repository';
import { PcCase } from './pc-case/pc-case.repository';
import { Guide } from './guide/guide.repository';

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

const ram = new RAM({
  RAMModel,
});

const storage = new Storage({
  StorageModel,
});

const powerSupply = new PowerSupply({
  PowerSupplyModel,
});

const pcCase = new PcCase({
  PcCaseModel,
});

const guide = new Guide({
  GuideModel,
});

export {
  user,
  cpu,
  cooler,
  motherboard,
  gpu,
  ram,
  storage,
  powerSupply,
  pcCase,
  guide,
};

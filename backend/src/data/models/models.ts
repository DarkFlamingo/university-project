import { User } from './user/user.model';
import { Motherboard } from './motherboard/motherboard.model';
import { Cooler } from './cooler/cooler.model';
import { CPU } from './cpu/cpu.model';
import { GPU } from './graphics-card/graphics-card.model';
import { PowerSupply } from './power-supply/power-supply.model';
import { RAM } from './ram/ram.model';
import { Storage } from './storage/storage.model';
import { PcCase } from './pc-case/pc-case.model';
import { AbstractModel } from './abstract/abstract.model';
import { Guide } from './guide/guide.model';

const user = new User();

const motherboard = new Motherboard();

const cooler = new Cooler();

const cpu = new CPU();

const gpu = new GPU();

const powerSupply = new PowerSupply();

const ram = new RAM();

const storage = new Storage();

const pcCase = new PcCase();

const guide = new Guide();

export {
  user,
  User,
  motherboard,
  Motherboard,
  cooler,
  Cooler,
  cpu,
  CPU,
  gpu,
  GPU,
  powerSupply,
  PowerSupply,
  ram,
  RAM,
  storage,
  Storage,
  pcCase,
  PcCase,
  guide,
  Guide,
  AbstractModel,
};

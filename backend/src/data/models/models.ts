import { User } from './user/user.model';
import { Motherboard } from './motherboard/motherboard.model';
import { Cooler } from './cooler/cooler.model';
import { CPU } from './cpu/cpu.model';
import { GraphicsCard } from './graphics-card/graphics-card.model';
import { PowerSupply } from './power-supply/power-supply.model';
import { RAM } from './ram/ram.model';
import { Storage } from './storage/storage.model';
import { AbstractModel } from './abstract/abstract.model';

const user = new User();

const motherboard = new Motherboard();

const cooler = new Cooler();

const cpu = new CPU();

const graphicsCard = new GraphicsCard();

const powerSupply = new PowerSupply();

const ram = new RAM();

const storage = new Storage();

export {
  user,
  User,
  motherboard,
  Motherboard,
  cooler,
  Cooler,
  cpu,
  CPU,
  graphicsCard,
  GraphicsCard,
  powerSupply,
  PowerSupply,
  ram,
  RAM,
  storage,
  Storage,
  AbstractModel,
};

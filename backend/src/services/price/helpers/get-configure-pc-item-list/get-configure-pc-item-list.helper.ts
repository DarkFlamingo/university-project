import {
  Motherboard as MotherboardModel,
  Cooler as CoolerModel,
  CPU as CPUModel,
  GPU as GPUModel,
  PowerSupply as PowerSupplyModel,
  RAM as RAMModel,
  Storage as StorageModel,
  PcCase as PcCaseModel,
} from '~/data/models/models';

const getConfiguredPcItemList = ({
  motherboard,
  cooler,
  cpu,
  gpu,
  powerSupply,
  ram,
  storage,
  pcCase,
}: {
  motherboard: MotherboardModel;
  cooler: CoolerModel;
  cpu: CPUModel;
  gpu: GPUModel;
  powerSupply: PowerSupplyModel;
  ram: RAMModel;
  storage: StorageModel;
  pcCase: PcCaseModel;
}): string[] => {
  const totalAmount =
    cpu.price +
    cooler.price +
    motherboard.price +
    gpu.price +
    powerSupply.price +
    ram.price +
    storage.price +
    pcCase.price;

  return [
    `CPU: ${cpu.name} - $${cpu.price}`,
    `Cooler: ${cooler.name} - $${cooler.price}`,
    `Motherboard: ${motherboard.name} - $${motherboard.price}`,
    `GPU: ${gpu.name} - $${gpu.price}`,
    `Power Supply: ${powerSupply.name} - $${powerSupply.price}`,
    `RAM: ${ram.name} - $${ram.price}`,
    `Storage: ${storage.name} - $${storage.price}`,
    `Case: ${pcCase.name} - $${pcCase.price}`,
    `Total Amount: $${totalAmount}`,
  ];
};

export { getConfiguredPcItemList };

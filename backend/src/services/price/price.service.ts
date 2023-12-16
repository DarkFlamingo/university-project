import {
  cooler as coolerRep,
  cpu as cpuRep,
  gpu as gpuRep,
  motherboard as motherboardRep,
  pcCase as pcCaseRep,
  powerSupply as powerSupplyRep,
  ram as ramRep,
  storage as storageRep,
} from '~/data/repositories/repositories';

import { getDialogResponse } from '~/helpers/helpers';
import {
  divideAmountBetweenComponents,
  getConfiguredPcItemList,
} from './helpers/helpers';

import { ResponseDto } from '~/common/types/types';
import { ComponentName } from '~/common/enums/enums';

type Constructor = {
  coolerRepository: typeof coolerRep;
  cpuRepository: typeof cpuRep;
  gpuRepository: typeof gpuRep;
  motherboardRepository: typeof motherboardRep;
  pcCaseRepository: typeof pcCaseRep;
  powerSupplyRepository: typeof powerSupplyRep;
  ramRepository: typeof ramRep;
  storageRepository: typeof storageRep;
};

class Price {
  #coolerRepository: typeof coolerRep;
  #cpuRepository: typeof cpuRep;
  #gpuRepository: typeof gpuRep;
  #motherboardRepository: typeof motherboardRep;
  #pcCaseRepository: typeof pcCaseRep;
  #powerSupplyRepository: typeof powerSupplyRep;
  #ramRepository: typeof ramRep;
  #storageRepository: typeof storageRep;

  constructor({
    coolerRepository,
    cpuRepository,
    gpuRepository,
    motherboardRepository,
    pcCaseRepository,
    powerSupplyRepository,
    ramRepository,
    storageRepository,
  }: Constructor) {
    this.#coolerRepository = coolerRepository;
    this.#cpuRepository = cpuRepository;
    this.#gpuRepository = gpuRepository;
    this.#motherboardRepository = motherboardRepository;
    this.#pcCaseRepository = pcCaseRepository;
    this.#powerSupplyRepository = powerSupplyRepository;
    this.#ramRepository = ramRepository;
    this.#storageRepository = storageRepository;
  }

  async getConfiguredPcDetailsByPrice(price: number): Promise<ResponseDto> {
    const prices = divideAmountBetweenComponents(price);

    const cpu = await this.#cpuRepository.getItemInPriceRangeOrLower(
      prices[ComponentName.CPU],
    );

    const cooler = await this.#coolerRepository.getItemInPriceRangeOrLower(
      prices[ComponentName.COOLER],
    );

    const gpu = await this.#gpuRepository.getItemInPriceRangeOrLower(
      prices[ComponentName.GPU],
    );

    const motherboard =
      await this.#motherboardRepository.getItemInPriceRangeOrLower(
        prices[ComponentName.MOTHERBOARD],
      );

    const pcCase = await this.#pcCaseRepository.getItemInPriceRangeOrLower(
      prices[ComponentName.CASE],
    );

    const powerSupply =
      await this.#powerSupplyRepository.getItemInPriceRangeOrLower(
        prices[ComponentName.POWER_SUPPLY],
      );

    const ram = await this.#ramRepository.getItemInPriceRangeOrLower(
      prices[ComponentName.RAM],
    );

    const storage = await this.#storageRepository.getItemInPriceRangeOrLower(
      prices[ComponentName.STORAGE],
    );

    if (
      !cpu ||
      !gpu ||
      !cooler ||
      !motherboard ||
      !pcCase ||
      !powerSupply ||
      !ram ||
      !storage
    ) {
      return getDialogResponse(
        'Unfortunately, we cannot assemble a PC according to your price',
      );
    }

    return getDialogResponse(
      'PC according to your price: ',
      ...getConfiguredPcItemList({
        cpu,
        gpu,
        cooler,
        motherboard,
        pcCase,
        powerSupply,
        ram,
        storage,
      }),
    );
  }
}

export { Price };

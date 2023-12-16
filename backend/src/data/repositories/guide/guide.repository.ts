import { Guide as GuideM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComponentName } from '~/common/enums/enums';

type Constructor = {
  GuideModel: typeof GuideM;
};

class Guide {
  #GuideModel: typeof GuideM;

  constructor({ GuideModel }: Constructor) {
    this.#GuideModel = GuideModel;
  }

  async getByComponentName(componentName: ComponentName): Promise<GuideM[]> {
    return this.#GuideModel.query().select().where({ componentName });
  }
}

export { Guide };

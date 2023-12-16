import { guide as guideRep } from '~/data/repositories/repositories';
import { Guide as GuideModel } from '~/data/models/models';
import { ComponentName } from '~/common/enums/enums';
import { getDialogResponse } from '~/helpers/helpers';
import { ResponseDto } from 'shared/common/types/types';

type Constructor = {
  guideRepository: typeof guideRep;
};

class Guide {
  #guideRepository: typeof guideRep;

  constructor({ guideRepository }: Constructor) {
    this.#guideRepository = guideRepository;
  }

  async getGuideListByComponentName(
    componentName: ComponentName,
  ): Promise<ResponseDto> {
    const guides = await this.#guideRepository.getByComponentName(
      componentName,
    );

    const guide: GuideModel | null =
      guides[Math.floor(Math.random() * guides.length)];

    if (!guide) {
      return getDialogResponse(
        'Unfortunately, we do not have instructions for installing this type of component.',
      );
    }

    // eslint-disable-next-line
    console.log("Guide: ", guide, '\n', 'guide text: ', guide.text);

    return getDialogResponse(...guide.text);
  }
}

export { Guide };

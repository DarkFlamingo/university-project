import { AbstractModel } from '~/data/models/models';

type Constructor<ModelT extends AbstractModel> = {
  Model: ModelT;
};

class AbstractRepository<ModelT extends AbstractModel> {
  protected Model: ModelT;

  constructor({ Model }: Constructor<ModelT>) {
    this.Model = Model;
  }

  async getAll(): Promise<ModelT[]> {
    return this.Model.$query().select().castTo<ModelT[]>().execute();
  }

  async getById(id: string): Promise<ModelT | null> {
    const item = await this.Model.$query().findById(id).castTo<ModelT | null>();

    if (!item) {
      return null;
    }

    return item;
  }

  async create(_payload: unknown): Promise<unknown> {
    throw new Error('Method not implemented');
  }
}

export { AbstractRepository };

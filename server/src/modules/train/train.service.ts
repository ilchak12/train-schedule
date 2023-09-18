import { Injectable, NotFoundException } from "@nestjs/common";
import { TrainRepository } from "./train.repository";
import { Train } from "./train.entity";

@Injectable()
export class TrainService {
  constructor(
    private readonly trainRepository: TrainRepository
  ) {}

  async save(train: Partial<Train>) {
    const entity = this.trainRepository.create(train);
    return await this.trainRepository.save(entity);
  }

  async findById(id: string) {
    if (!id) return null;
    return await this.trainRepository.findOne({where: {id}});
  }

  async getAll() {
    return await this.trainRepository.find();
  }

  async update(id: string, attrs: Partial<Train>) {
    const entity = await this.findById(id);
    if (!entity)
      throw new NotFoundException(`Train not found`);

    Object.assign(entity, attrs);
    return await this.save(entity);
  }

  async delete(id: string) {
    const entity = await this.findById(id);
    if (!entity)
      throw new NotFoundException(`Train not found`);

    return await this.trainRepository.remove(entity);
  }
}

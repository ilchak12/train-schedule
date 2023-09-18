import { BadRequestException, Injectable } from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { Admin } from "./admin.entity";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class AdminService {

  constructor(
    private readonly adminRepository: AdminRepository,
  ) {}

  async save(admin: Partial<Admin>){
    const entity = this.adminRepository.create(admin);
    return await this.adminRepository.save(entity);
  }

  async findByEmail(email: string) {
    if (!email) return null;
    return await this.adminRepository.findOne({where: {email}});
  }

  async findById(id: string) {
    if (!id) return null;
    return await this.adminRepository.findOne({where: {id}});
  }

  async findByIdOrThrowError(id: string, errorFunc: () => void) {
    const entity = await this.findById(id);
    if (!entity)
      errorFunc();

    return entity;
  }

  async findByEmailOrThrowError(email: string, errorFunc: () => void) {
    const entity = await this.findByEmail(email);
    if (!entity)
      errorFunc();

    return entity;
  }
}

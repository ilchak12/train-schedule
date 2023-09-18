import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcryptjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HashService {

  constructor(
    private readonly configService: ConfigService
  ) {}

  async hash(value: string) {
    const salt = parseInt(this.configService.get<string>("SALT"));
    return await hash(value, salt);
  }

  async compare(value: string, hash: string) {
    return await compare(value, hash);
  }
}

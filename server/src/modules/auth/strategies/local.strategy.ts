import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(
    private readonly authService: AuthService,
  ) {super();}

  async validate(username: string, password: string) {
    return await this.authService.validateAdmin(username, password);
  }
}
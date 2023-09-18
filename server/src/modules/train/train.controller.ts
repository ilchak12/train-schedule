import { Controller, Get, Post, Put, Patch, Param, Body, Delete, UseGuards } from "@nestjs/common";
import { TrainService } from "./train.service";
import { TrainDto } from "./dtos/train.dto";
import { ChangeTrainStatusDto } from "./dtos/change-train-status.dto";
import { InTrainDto } from "./dtos/in-train.dto";
import { Serialize } from "../../common/decorators/serialize.decorator";
import { AccessTokenGuard } from "../auth/guards/access-token.guard";

@Controller('/v1/trains')
@Serialize(TrainDto)
export class TrainController {

  constructor(
    private readonly trainService: TrainService,
  ) {}

  @Get()
  async getAll() {
    return await this.trainService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.trainService.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() body: InTrainDto) {
    return await this.trainService.save(body);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.trainService.delete(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: InTrainDto) {
    return await this.trainService.update(id, body);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id/status')
  async changeStatus(@Param('id') id: string, @Body() body: ChangeTrainStatusDto) {
    return await this.trainService.update(id, body);
  }
}

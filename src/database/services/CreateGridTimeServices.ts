/* eslint-disable class-methods-use-this */
import { GridTime } from "../entities/GridTimeEntity";

import {
  GridTimeRepository,
} from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  name: string;
};

export class CreateGridTimeServices {
  async execute(
    {
      name,
    }: IRequest,
  ): Promise<GridTime | Error> {
    const repo = GridTimeRepository();

    if (await repo.findOne({
      where: {
        name,
      },
    })) {
      return new Error(messagesGenerated.GRIDTIME_ALREADY_EXISTS);
    }

    const contPositionTime = await repo.count() || 0;

    const responseRepo = repo.create({
      name,
      position: contPositionTime,
    });

    await repo.save(responseRepo);

    return responseRepo;
  }
}

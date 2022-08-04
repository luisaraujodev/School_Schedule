/* eslint-disable class-methods-use-this */
import { Teaching } from "../entities/TeachingEntity";
import { TeachingRepository } from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  name: string;
  nickname: string;
};

export class CreateTeachingServices {
  async execute({ name, nickname }: IRequest): Promise<Teaching | Error> {
    const repo = TeachingRepository();

    const TeachingExists = await repo.findOne({
      where: [{ name, nickname }],
    });

    if (TeachingExists) {
      return new Error(messagesGenerated.NAME_OR_SURNAME_ALREADY_EXISTS);
    }

    if (!name) {
      return new Error(messagesGenerated.MANDATORY_NAME);
    }

    if (!nickname) {
      return new Error(messagesGenerated.MANDATORY_NICKNAME);
    }

    const responseRepo = repo.create({ name, nickname });

    await repo.save(responseRepo);

    return responseRepo;
  }
}

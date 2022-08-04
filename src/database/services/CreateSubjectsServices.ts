/* eslint-disable class-methods-use-this */

import { Subjects } from "../entities/SubjectsEntity";
import {
  SubjectsRepository,
} from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  name: string;
  nickname: string;
};

export class CreateSubjectsService {
  async execute(
    {
      name, nickname,
    }: IRequest,
  ): Promise<Subjects | Error> {
    const repo = SubjectsRepository();

    if (!name) {
      return new Error(messagesGenerated.MANDATORY_NAME);
    }

    if (!nickname) {
      return new Error(messagesGenerated.MANDATORY_NICKNAME);
    }

    const SubjectExists = await SubjectsRepository().findOne({
      where: {
        name,
      },
    });

    if (SubjectExists) {
      return new Error(messagesGenerated.NAME_OR_SURNAME_ALREADY_EXISTS);
    }

    const responseRepo = repo.create({
      name,
      nickname,
    });

    await repo.save(responseRepo);

    return responseRepo;
  }
}

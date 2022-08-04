/* eslint-disable class-methods-use-this */
import { In } from "typeorm";
import { Teachers } from "../entities/TeachersEntity";
import {
  TeachersRepository,
  ShiftRepository,
  SubjectsRepository,
} from "../repositories";

import messagesGenerated from "../../lang";

type shiftIdstype = {
  id: string
}

type subjectIdstype = {
  id: string
}

export type IRequest = {
  name: string;
  shiftIds: shiftIdstype[];
  subjectIds: subjectIdstype[];
  workload: number;
};

export class CreateTeacherService {
  async execute(
    {
      name, shiftIds, subjectIds, workload,
    }: IRequest,
  ): Promise<Teachers | Error> {
    const repo = TeachersRepository();

    const TeachersExists = await TeachersRepository().findOne({
      where: {
        name,
      },
    });

    if (TeachersExists) {
      return new Error(messagesGenerated.TEACHER_DOES_NOT_EXISTS);
    }

    const ShiftExists = await ShiftRepository().find({
      where: {
        id: In(shiftIds.map((m) => m.id)),
      },
    });

    if (!ShiftExists) {
      return new Error(messagesGenerated.SUBJECT_DOES_NOT_EXISTS);
    }

    const SubjectExists = await SubjectsRepository().find({
      where: {
        id: In(subjectIds.map((m) => m.id)),
      },
    });

    if (!SubjectExists) {
      return new Error(messagesGenerated.SUBJECT_DOES_NOT_EXISTS);
    }

    if (workload === 0) {
      return new Error(messagesGenerated.WORKLOAD_INCORRET);
    }

    const responseRepo = repo.create({
      name,
      shift: ShiftExists,
      subjects: SubjectExists,
      workload,
    });

    console.log(responseRepo, ShiftExists, SubjectExists);
    await repo.save(responseRepo);

    return responseRepo;
  }
}

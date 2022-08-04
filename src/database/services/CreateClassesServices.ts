/* eslint-disable*/
import { In } from "typeorm";
import { Classes } from "../entities/ClassesEntity";
import { Subjects } from "../entities/SubjectsEntity";

import {
  ScheduleRepository,
  ClassesRepository,
  ShiftRepository,
  SubjectsRepository,
} from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  name: string;
  scheduleId: string;
  shiftId: string;
  subjectId: Subjects[];
};

export default class CreateClassesService {
  async execute(
    {
      name,
      scheduleId,
      shiftId,
      subjectId,
    }: IRequest,
  ): Promise<Classes | Error> {
    const repo = ClassesRepository();

    const ScheduleExists = await ScheduleRepository().findOne({
      where: {
        id: scheduleId,
      },
    });

    if (!ScheduleExists) {
      return new Error(messagesGenerated.SCHEDULE_ALREADY_EXISTS);
    }

    const ShiftExists = await ShiftRepository().findOne({
      where: {
        id: shiftId,
      },
    });

    if (!ShiftExists) {
      return new Error(messagesGenerated.SHIFT_DOES_NOT_EXISTS);
    }

    const subjectsExists = await SubjectsRepository().find({
      where: {
        id: In(subjectId.map((m) => m.id)),
      },
    });

    if (!subjectsExists) {
      return new Error(messagesGenerated.SUBJECT_DOES_NOT_EXISTS);
    }

    if (await repo.findOne({
      where: {
        name,
        schedule: ScheduleExists,
        shift: ShiftExists,
        subject: subjectsExists,
      },
    })) {
      return new Error(messagesGenerated.CLASSES_ALREADY_EXISTS);
    }

    const responseRepo = repo.create({
      name,
      schedule: ScheduleExists,
      shift: ShiftExists,
      subject: subjectsExists,
    });

    await repo.save(responseRepo);

    return responseRepo;
  }
}

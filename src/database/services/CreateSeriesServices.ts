/* eslint-disable*/
import { In } from "typeorm";
import { Series } from "../entities/SeriesEntily";
import {
  SeriesRepository,
  TeachingRepository,
  ShiftRepository,
  SubjectsRepository,
  DisciplineWorkloadRepository,
} from "../repositories";

import messagesGenerated from "../../lang";
import { DisciplineWorkload } from "../entities/DisciplineWorkloadEntity";

type disciplineWorkload = {
  disciplineId: string,
  workload: number;
}

export type IRequest = {
  name: string;
  teachingId: string;
  disciplineWorkload: disciplineWorkload[];
};

export class CreateSeriesServices {
  async createDisciplineWorkloadDetail(series: Series, disciplineWorkload: disciplineWorkload[]): Promise<DisciplineWorkload[] | Error> {

    const repo = DisciplineWorkloadRepository();

    const newDisciplineWorkload: DisciplineWorkload[] = [] as DisciplineWorkload[];

    for (const grid of disciplineWorkload) {
      const gridDisciplineExists = await SubjectsRepository().findOne({
        where: {
          id: grid.disciplineId,
        },
      });

      if (!gridDisciplineExists) {
        return new Error(messagesGenerated.GRIDTIME_ALREADY_EXISTS);
      }

      const responseRepo = repo.create();

      responseRepo.series = series;
      responseRepo.subjects = gridDisciplineExists;
      responseRepo.workload = grid.workload;

      newDisciplineWorkload.push(responseRepo);
    }

    console.log("newSeriesDetail", newDisciplineWorkload);
    return newDisciplineWorkload;

  }

  async execute({
    name,
    teachingId,
    disciplineWorkload
  }: IRequest): Promise<Series | Error> {
    const repo = SeriesRepository();

    if (!name) {
      return new Error(messagesGenerated.MANDATORY_NAME);
    }

    const SeriesExists = await repo.findOne({
      where: { name },
    });

    if (SeriesExists) {
      return new Error(messagesGenerated.MANDATORY_NAME);
    }

    const TeachingExist = await TeachingRepository().findOne({
      where: { id: teachingId },
    });

    if (!TeachingExist) {
      return new Error(messagesGenerated.NAME_OR_SURNAME_ALREADY_EXISTS);
    }

    const SubjectExists = await SubjectsRepository().find({
      where: {
        id: In(disciplineWorkload.map((m) => m.disciplineId)),
      },
    });

    if (!SubjectExists) {
      return new Error(messagesGenerated.SUBJECT_DOES_NOT_EXISTS);
    }


    // const responseRepo = repo.create({ name, teaching: TeachingExists, shifts: ShiftExists });
    const responseRepo = repo.create({ name, teaching: TeachingExist });

    const disciplineWorkloadDetailExist = await this.createDisciplineWorkloadDetail(responseRepo, disciplineWorkload);

    if (disciplineWorkloadDetailExist instanceof Error) {
      return new Error(messagesGenerated.SHIFT_DOES_NOT_EXISTS);
    }

    responseRepo.disciplineWorkload = disciplineWorkloadDetailExist;
    await repo.save(responseRepo);

    return responseRepo;
  }
}

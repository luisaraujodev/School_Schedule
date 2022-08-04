/* eslint-disable  */
import { Schedule } from "../entities/ScheduleEntity";
import { ScheduleDetail } from "../entities/ScheduleDetailEntity";
import {
  ScheduleRepository, ScheduleDetailRepository, ShiftRepository, TeamRepository, TeachersRepository, GridTimeRepository,
} from "../repositories";

import messagesGenerated from "../../lang";

type scheduleDetailType = {
  dayWeek: string;
  teamID: string;
  teacherID: string,
  gridTimeID: string,
}

export type IRequest = {
  shiftID: string; 
  scheduleDetai: scheduleDetailType[]
};

export class CreateScheduleService {
  async createDisciplineWorkloadDetail(schedule: Schedule, scheduleDetail: scheduleDetailType[]): Promise<ScheduleDetail[] | Error> {
    const repo = ScheduleDetailRepository();

    const newScheduleDetail: ScheduleDetail[] = [] as ScheduleDetail[];

    for (const grid of scheduleDetail) {
      const gridTeacherExists = await TeachersRepository().findOne({
        where: {
          id: grid.teacherID,
        },
      });

      const gridTeamExists = await TeamRepository().findOne({
        where: { id: grid.teamID },
      });
  
      if (!gridTeamExists) {
        return new Error(messagesGenerated.MANDATORY_NAME);
      }

      if (!gridTeacherExists) {
        return new Error(messagesGenerated.GRIDTIME_ALREADY_EXISTS);
      }

      const gridTimeExists = await GridTimeRepository().findOne({
        where: {
          id: grid.gridTimeID,
        },
      });

      if (!gridTimeExists) {
        return new Error(messagesGenerated.GRIDTIME_ALREADY_EXISTS);
      }

      const responseRepo = repo.create();

      responseRepo.schedule = schedule;
      responseRepo.team = gridTeamExists;
      responseRepo.teacher = gridTeacherExists;
      responseRepo.dayWeek = grid.dayWeek;
      responseRepo.gridTime = gridTimeExists;

      newScheduleDetail.push(responseRepo);
    }

    console.log("newSeriesDetail", newScheduleDetail);
    return newScheduleDetail;
  }

  async execute({ shiftID, scheduleDetai }: IRequest): Promise<Schedule | Error> {
    const repo = ScheduleRepository();

    const shiftExists = await ShiftRepository().findOne({
      where: { id: shiftID },
    });

    if (!shiftExists) {
      return new Error(messagesGenerated.MANDATORY_NAME);
    }

    const responseRepo = repo.create({ shift: shiftExists });

    await this.createDisciplineWorkloadDetail(responseRepo, scheduleDetai)

    await repo.save(responseRepo);

    return responseRepo;
  }
}

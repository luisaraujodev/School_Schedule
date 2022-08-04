/* eslint-disable */
import { Classes } from "../entities/ClassesEntity";
import { ClassesRepository, ScheduleRepository } from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  scheduleId: string;
};

export class GetIDClassesService {
  async execute({ scheduleId }: IRequest): Promise<Classes[] | Error> {
    try {

      const ScheduleExists = await ScheduleRepository().findOne({
        where: {
          id: scheduleId,
        },
      });

      if (!ScheduleExists) {
        return new Error(messagesGenerated.SCHEDULE_ALREADY_EXISTS);
      }

      const repor = await ClassesRepository().find({
        where: {
          schedule: ScheduleExists
        },
      });

      return repor;
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

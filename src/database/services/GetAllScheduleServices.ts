/* eslint-disable */
import { Schedule } from "../entities/ScheduleEntity";
import { ScheduleRepository } from "../repositories";

import messagesGenerated from "../../lang";

export class GetAllScheduleServices {
  async execute(): Promise<Schedule[] | Error> {
    try {
      const result = await ScheduleRepository().find();
      return result
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

/* eslint-disable*/
import { Schedule } from "../entities/ScheduleEntity";
import { GetAllScheduleServices } from "../services/GetAllScheduleServices";

export class GetAllScheduleController {
  async handle(): Promise<Schedule[] | Error> {
    const createService = new GetAllScheduleServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

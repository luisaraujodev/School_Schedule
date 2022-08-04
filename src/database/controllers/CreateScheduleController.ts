/* eslint-disable*/
import { CreateScheduleService, IRequest } from "../services/CreateScheduleServices";

export interface createScheduleType extends IRequest {
};

export class CreateScheduleController {
  async handle({ shiftID, scheduleDetai }: IRequest) {
    const createService = new CreateScheduleService();

    const result = await createService.execute({ shiftID, scheduleDetai });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

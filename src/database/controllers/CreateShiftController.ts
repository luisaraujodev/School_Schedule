/* eslint-disable*/
import { CreateShiftServices, IRequest } from "../services/CreateShiftServices";

export interface createShiftType extends IRequest {
};

export class CreateShiftController {
  async handle({ name, gridTimesAndWeeks }: createShiftType) {
    const createService = new CreateShiftServices();

    const result = await createService.execute({ name, gridTimesAndWeeks });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

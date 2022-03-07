/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { CreateScheduleService, IRequest } from "../services/CreateScheduleServices";

export class CreateScheduleController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async handle({ name }: IRequest) {
    const createService = new CreateScheduleService();

    const result = await createService.execute({ name });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

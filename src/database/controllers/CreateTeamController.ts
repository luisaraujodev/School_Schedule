/* eslint-disable*/
import { CreateTeamServices, IRequest } from "../services/CreateTeamServices";

export interface createTeamType extends IRequest {
};

export class CreateTeamController {
  async handle({ name, shiftId, seriesId,gridTimesAndWeeks }: createTeamType) {
    const createService = new CreateTeamServices();

    const result = await createService.execute({ name, shiftId, seriesId, gridTimesAndWeeks });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

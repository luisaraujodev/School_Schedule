/* eslint-disable*/
import { CreateSeriesServices, IRequest } from "../services/CreateSeriesServices";

export interface createSeriesType extends IRequest {
};

export class CreateSeriesController {
  async handle({ name, teachingId, disciplineWorkload }: createSeriesType) {
    const createService = new CreateSeriesServices();

    const result = await createService.execute({ name, teachingId, disciplineWorkload });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

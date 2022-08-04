/* eslint-disable*/
import { CreateGridTimeServices, IRequest } from "../services/CreateGridTimeServices";

export interface createGridTimeType extends IRequest {
};

export class CreateGridTimeController {
  async handle({ name }: createGridTimeType) {
    const createService = new CreateGridTimeServices();

    const result = await createService.execute({ name });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

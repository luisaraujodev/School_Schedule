/* eslint-disable*/
import { CreateSubjectsService, IRequest } from "../services/CreateSubjectsServices";

export interface createSubjectsType extends IRequest {
};

export class CreateSubjectsController {
  async handle({ name, nickname }: createSubjectsType) {
    const createService = new CreateSubjectsService();

    const result = await createService.execute({ name, nickname });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

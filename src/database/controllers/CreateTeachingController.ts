/* eslint-disable*/
import { CreateTeachingServices, IRequest } from "../services/CreateTeachingServices";

export interface createTeachingType extends IRequest {
};

export class CreateTeachingController {
  async handle({ name, nickname }: createTeachingType) {
    const createService = new CreateTeachingServices();

    const result = await createService.execute({ name, nickname });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

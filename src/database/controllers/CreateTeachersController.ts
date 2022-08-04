/* eslint-disable*/
import { CreateTeacherService, IRequest } from "../services/CreateTeachersServices";

export interface createTeachersType extends IRequest {
};

export class CreateTeachersController {
  async handle({ name, shiftIds, subjectIds, workload }: createTeachersType) {
    const createService = new CreateTeacherService();

    const result = await createService.execute({ name, shiftIds, subjectIds, workload });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

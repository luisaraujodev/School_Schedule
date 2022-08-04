/* eslint-disable*/
import { CreateLinkClassTeacherServices, IRequest } from "../services/CreateLinkClassTeacherServices";

export interface createLinkClassTeacherType extends IRequest {
};

export class CreateLinkClassTeacherController {
  async handle({ linkClassTeacheres }: createLinkClassTeacherType) {
    const createService = new CreateLinkClassTeacherServices();

    const result = await createService.execute({ linkClassTeacheres });

    if (result instanceof Error) {
      return result.message;
    }

    return result;
  }
}

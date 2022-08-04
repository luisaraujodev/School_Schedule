/* eslint-disable*/
import { LinkClassTeacherEntity } from "../entities/LinkClassTeacherEntity";
import { GetIDLinkClassTeacherServices, IRequest } from "../services/GetIDLinkClassTeacherServices";

export class GetIDLinkClassTeacherController {
  async handle({ teamId }: IRequest): Promise<LinkClassTeacherEntity[] | Error> {
    const createService = new GetIDLinkClassTeacherServices();

    const result = await createService.execute({ teamId });

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

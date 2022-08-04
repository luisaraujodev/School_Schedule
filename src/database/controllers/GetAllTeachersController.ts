/* eslint-disable*/
import { Teachers } from "../entities/TeachersEntity";
import { GetAllTeachersServices } from "../services/GetAllTeachersServices";

export class GetAllTeachersController {
  async handle(): Promise<Teachers[] | Error> {
    const createService = new GetAllTeachersServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

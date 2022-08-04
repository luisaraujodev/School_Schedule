/* eslint-disable*/
import { Teaching } from "../entities/TeachingEntity";
import { GetAllTeachingServices } from "../services/GetAllTeachingServices";

export class GetAllTeachingController {
  async handle(): Promise<Teaching[] | Error> {
    const createService = new GetAllTeachingServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }
    return result;
  }
}

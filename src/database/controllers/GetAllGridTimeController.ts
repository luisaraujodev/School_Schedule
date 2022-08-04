/* eslint-disable*/
import { GridTime } from "../entities/GridTimeEntity";
import { GetAllGridTimeServices } from "../services/GetAllGridTimeServices";

export class GetAllGridTimeController {
  async handle(): Promise<GridTime[] | Error> {
    const createService = new GetAllGridTimeServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

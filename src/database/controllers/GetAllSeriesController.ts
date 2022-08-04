/* eslint-disable*/
import { Series } from "../entities/SeriesEntily";
import { GetAllSeriesServices } from "../services/GetAllSeriesServices";

export class GetAllSeriesController {
  async handle(): Promise<Series[] | Error> {
    const createService = new GetAllSeriesServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

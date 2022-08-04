/* eslint-disable*/
import { Series } from "../entities/SeriesEntily";
import { GetTeachingIDSeriesServices, IRequest } from "../services/GetTeachingIDSeriesServices";

export class GetTeachingIDSeriesController {
  async handle({ teachingID }: IRequest): Promise<Series[] | Error> {
    const createService = new GetTeachingIDSeriesServices();

    const result = await createService.execute({ teachingID });

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

/* eslint-disable */
import { Series } from "../entities/SeriesEntily";
import { SeriesRepository} from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  teachingID: string;
};

export class GetTeachingIDSeriesServices {
  async execute({ teachingID }: IRequest): Promise<Series[] | Error> {
    try {
      return await SeriesRepository().find({ where: { teaching: teachingID } });
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

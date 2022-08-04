/* eslint-disable */
import { GridTime } from "../entities/GridTimeEntity";
import { GridTimeRepository } from "../repositories";

import messagesGenerated from "../../lang";

export class GetAllGridTimeServices {
  async execute(): Promise<GridTime[] | Error> {
    try {
      return await GridTimeRepository().find({
        order: {
          position: "ASC"
        }
      })
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

/* eslint-disable */
import { Teachers } from "../entities/TeachersEntity";
import { TeachersRepository } from "../repositories";

import messagesGenerated from "../../lang";

export class GetAllTeachersServices {
  async execute(): Promise<Teachers[] | Error> {
    try {
      return await TeachersRepository().find();
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

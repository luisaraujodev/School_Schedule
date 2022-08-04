/* eslint-disable */
import { Teaching } from "../entities/TeachingEntity";
import { TeachingRepository } from "../repositories";

import messagesGenerated from "../../lang";

export class GetAllTeachingServices {
  async execute(): Promise<Teaching[] | Error> {
    try {
      return await TeachingRepository().find();
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

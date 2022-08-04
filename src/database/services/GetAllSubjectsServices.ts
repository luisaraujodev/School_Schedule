/* eslint-disable */
import { Subjects } from "../entities/SubjectsEntity";
import { SubjectsRepository } from "../repositories";

import messagesGenerated from "../../lang";

export class GetAllSubjectsServices {
  async execute(): Promise<Subjects[] | Error> {
    try {
      return await SubjectsRepository().find();
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

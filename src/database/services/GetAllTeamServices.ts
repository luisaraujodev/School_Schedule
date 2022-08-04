/* eslint-disable */
import { Team } from "../entities/TeamEntity";
import { TeamRepository } from "../repositories";

import messagesGenerated from "../../lang";

export class GetAllTeamServices {
  async execute(): Promise<Team[] | Error> {
    try {
      return await TeamRepository().find();
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

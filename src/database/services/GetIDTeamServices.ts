/* eslint-disable */
import { Team } from "../entities/TeamEntity";
import { TeamRepository } from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  teamId: string;
};

export class GetIDTeamServices {
  async execute({ teamId }: IRequest): Promise<Team | undefined | Error> {
    try {
      return await TeamRepository().findOne({
        where: {
          id: teamId
        }
      });
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

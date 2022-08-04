/* eslint-disable*/
import { Team } from "../entities/TeamEntity";
import { GetIDTeamServices, IRequest } from "../services/GetIDTeamServices";

export class GetIDTeamController {
  async handle({ teamId }: IRequest): Promise<Team | undefined | Error> {
    const createService = new GetIDTeamServices();

    const result = await createService.execute({ teamId });

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

/* eslint-disable*/
import { Team } from "../entities/TeamEntity";
import { GetAllTeamServices } from "../services/GetAllTeamServices";

export class GetAllTeamController {
  async handle(): Promise<Team[] | Error> {
    const createService = new GetAllTeamServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

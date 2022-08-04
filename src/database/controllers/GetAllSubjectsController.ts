/* eslint-disable*/
import { Subjects } from "../entities/SubjectsEntity";
import { GetAllSubjectsServices } from "../services/GetAllSubjectsServices";

export class GetAllSubjectsController {
  async handle(): Promise<Subjects[] | Error> {
    const createService = new GetAllSubjectsServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

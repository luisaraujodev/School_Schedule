/* eslint-disable*/
import { Shift } from "../entities/ShiftEntity";
import { GetAllShiftServices, IRequest } from "../services/GetAllShiftServices";

export interface getAllShiftType extends IRequest {
};

export class GetAllShiftController {
  async handle(): Promise<Shift[] | Error> {
    const createService = new GetAllShiftServices();

    const result = await createService.execute();

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

/* eslint-disable*/
import { Shift } from "../entities/ShiftEntity";
import { GetIDShiftServices, IRequest } from "../services/GetIDShiftServices";

export class GetIDShiftController {
  async handle({ shiftId }: IRequest): Promise<Shift | Error> {
    const createService = new GetIDShiftServices();

    const result = await createService.execute({ shiftId });

    if (result instanceof Error) {
      return new Error(result.message)
    }

    return result;
  }
}

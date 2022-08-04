/* eslint-disable */
import { Shift } from "../entities/ShiftEntity";
import { ShiftDetail } from "../entities/ShiftDetailEntity";
import { ShiftRepository } from "../repositories";

import messagesGenerated from "../../lang";


export type IRequest = {
  id: string;
  name: string;
  shiftDetail: ShiftDetail[];
};

export class GetAllShiftServices {
  async execute(): Promise<Shift[] | Error> {
    try {
      const result = await ShiftRepository()
        .find();
      return result
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}


// .select(["marking.id", "marking.created_at", "marking.code"])
//         //add modality
//         .leftJoin("marking.modality", "modality")
//         .addSelect("modality.name")
//         //add markingdetail
//         .leftJoinAndSelect("marking.markingdetail", "markingdetail")
//         //add subject de markingdetail 
//         .leftJoinAndSelect("markingdetail.subject", "subject")
//         .addSelect("markingdetail.room")
//         //add user
//         .leftJoin("marking.user", "user").addSelect("user.name")
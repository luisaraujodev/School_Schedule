/* eslint-disable*/
import { Shift } from "../entities/ShiftEntity";
import { ShiftDetail } from "../entities/ShiftDetailEntity"
import {
  ShiftRepository, ShiftDetailRepository, GridTimeRepository,
} from "../repositories";

import messagesGenerated from "../../lang";
import { In } from "typeorm";
import { GridTime } from "../entities/GridTimeEntity";


type gridTimesAndWeeks = {
  gridTimeId: string,
  mon?: boolean,
  tue?: boolean,
  wed?: boolean,
  thu?: boolean,
  fri?: boolean,
  sat?: boolean,
  sun?: boolean,
}

export type IRequest = {
  name: string;
  gridTimesAndWeeks: gridTimesAndWeeks[];
};

export class CreateShiftServices {
  private async createShiftDetail(shift: Shift, gridTimesAndWeeks: gridTimesAndWeeks[]): Promise<ShiftDetail[] | Error> {
    const repo = ShiftDetailRepository();

    let newshiftDetail: ShiftDetail[] = [] as ShiftDetail[];

    for (const grid of gridTimesAndWeeks) {
      const gridTimeExists = await GridTimeRepository().findOne({
        where: {
          id: grid.gridTimeId,
        },
      });

      if (!gridTimeExists) {
        return new Error(messagesGenerated.GRIDTIME_ALREADY_EXISTS);
      }

      const responseRepo = repo.create({ ...grid })

      responseRepo.shift = shift;
      responseRepo.gridTime = gridTimeExists;

      newshiftDetail.push(responseRepo)
      console.log("newshiftDetailgrid", grid)
    }
    console.log("newshiftDetail", newshiftDetail)

    repo.save(newshiftDetail)
    return newshiftDetail
  }

  async execute(
    {
      name,
      gridTimesAndWeeks,
    }: IRequest,
  ): Promise<Shift | Error> {
    const repo = ShiftRepository();

    let ShiftExists = await ShiftRepository().findOne({
      where: {
        name,
      },
    });

    if (!ShiftExists) {
      const createShift = await ShiftRepository().create({
        name,
      })

      ShiftExists = createShift
    }

    const gridTimeExists = await GridTimeRepository().find({
      where: {
        id: In(gridTimesAndWeeks.map((m) => m.gridTimeId)),
      },
    });

    if (!gridTimeExists) {
      return new Error(messagesGenerated.GRIDTIME_ALREADY_EXISTS);
    }

    const repoShift = repo.create({
      name,
    });

    const repoShiftDetail = await this.createShiftDetail(repoShift, gridTimesAndWeeks);

    if (repoShiftDetail instanceof Error) {
      return new Error(messagesGenerated.SHIFT_DOES_NOT_EXISTS);
    }

    repoShift.shiftDetail = repoShiftDetail;

    console.log("responseRepo", repoShift);
    await repo.save(repoShift);

    return repoShift;
  }
}

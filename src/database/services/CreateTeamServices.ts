/* eslint-disable*/
import { In } from "typeorm";
import { Series } from "../entities/SeriesEntily";
import { Team } from "../entities/TeamEntity";
import { TeamDetail } from "../entities/TeamDetailEntity";
import {
  SeriesRepository,
  TeachingRepository,
  ShiftRepository,
  GridTimeRepository,
  SubjectsRepository,
  TeamRepository,
  TeamDetailRepository
} from "../repositories";

import messagesGenerated from "../../lang";

type gridTimesAndWeeks_type = {
  gridTimeId: string;
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  sun?: boolean;
};

export type IRequest = {
  name: string;
  seriesId: string;
  shiftId: string;
  gridTimesAndWeeks: gridTimesAndWeeks_type[]
};

export class CreateTeamServices {
  private async createTeamDetail(
    team: Team,
    gridTimesAndWeeks: gridTimesAndWeeks_type[]
  )
    : Promise<TeamDetail[] | Error> {
    const repo = TeamDetailRepository();

    const newTeamDetail: TeamDetail[] = [] as TeamDetail[];

    for (const grid of gridTimesAndWeeks) {
      const gridTimeExists = await GridTimeRepository().findOne({
        where: {
          id: grid.gridTimeId,
        },
      });

      if (!gridTimeExists) {
        return new Error(messagesGenerated.GRIDTIME_ALREADY_EXISTS);
      }

      const responseRepo = repo.create({ ...grid });

      responseRepo.team = team;
      responseRepo.gridTime = gridTimeExists;

      newTeamDetail.push(responseRepo);
    }

    console.log("newTeamDetail", newTeamDetail);
    return newTeamDetail;
  }

  async execute({
    name,
    seriesId,
    shiftId,
    gridTimesAndWeeks,
  }: IRequest): Promise<Team | Error> {
    const repo = TeamRepository();

    if (!name) {
      return new Error(messagesGenerated.MANDATORY_NAME);
    }

    const SerieExist = await SeriesRepository().findOne({
      where: { id: seriesId },
    });

    if (!SerieExist) {
      return new Error(messagesGenerated.NAME_OR_SURNAME_ALREADY_EXISTS);
    }

    const ShiftExist = await ShiftRepository()
      .findOne(
        {
          where: { id: shiftId },
        },
      );

    if (!ShiftExist) {
      return new Error(messagesGenerated.SHIFT_DOES_NOT_EXISTS);
    }

    // const responseRepo = repo.create({ name, teaching: TeachingExists, shifts: ShiftExists });
    const responseRepo = repo.create({ name, shift: ShiftExist, series: SerieExist });

    const teamDetailExist = await this.createTeamDetail(responseRepo, gridTimesAndWeeks);

    if (teamDetailExist instanceof Error) {
      return new Error(messagesGenerated.SHIFT_DOES_NOT_EXISTS);
    }

    responseRepo.teamDetail = teamDetailExist;
    await repo.save(responseRepo);

    return responseRepo;
  }
}

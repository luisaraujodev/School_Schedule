/* eslint-disable class-methods-use-this */
import { Schedule } from "../entities/ScheduleEntity";
import { ScheduleRepository } from "../repositories";

export type IRequest = {
  name: string;
};

export class CreateScheduleService {
  async execute({ name }: IRequest): Promise<Schedule | Error> {
    const repo = ScheduleRepository();

    if (await repo.findOne({ name })) {
      return new Error("Schedule already exists");
    }

    const responseRepo = repo.create({ name });

    await repo.save(responseRepo);

    return responseRepo;
  }
}

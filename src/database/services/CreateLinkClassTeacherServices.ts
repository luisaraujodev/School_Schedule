/* eslint-disable */
import { LinkClassTeacherEntity } from "../entities/LinkClassTeacherEntity";

import {
  LinkClassTeacherEntityRepository, TeachersRepository, SubjectsRepository, TeamRepository,
} from "../repositories";

import messagesGenerated from "../../lang";

type LinkClassTeacher = {
  teamId: string
  consecutiveClasses: number
  disciplineId: string
  teacherId: string
}

export type IRequest = {
  linkClassTeacheres: LinkClassTeacher[]
};

export class CreateLinkClassTeacherServices {
  async execute(
    { linkClassTeacheres }: IRequest,
  ): Promise<LinkClassTeacherEntity[] | Error> {
    const listlinkClassTeacheres = async (linkClassTeacher: LinkClassTeacher) => {
      const TeamExist = await TeamRepository()
        .findOne(
          {
            where: { id: linkClassTeacher.teamId },
          },
        );

      if (!TeamExist) {
        return
      }

      const subjectsExist = await SubjectsRepository()
        .findOne(
          {
            where: { id: linkClassTeacher.disciplineId },
          },
        );

      if (!subjectsExist) {
        return;
      }

      const teachersExist = await TeachersRepository()
        .findOne(
          {
            where: { id: linkClassTeacher.teacherId },
          },
        );

      if (!teachersExist) {
        return
      }

      return {
        team: TeamExist,
        subject: subjectsExist,
        teacher: teachersExist,
        consecutiveClasses: linkClassTeacher.consecutiveClasses
      } as LinkClassTeacherEntity
    };

    const repo = LinkClassTeacherEntityRepository();

    const linkClassTeacheresFinal: LinkClassTeacherEntity[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const linkClassTeacher of linkClassTeacheres) {
      const list = await listlinkClassTeacheres(linkClassTeacher)
      if (list) {
        linkClassTeacheresFinal.push(list);
      }
    }

    const responseRepo = repo.create(linkClassTeacheresFinal);

    repo.delete({ team: linkClassTeacheresFinal[0].team })
    await repo.save(responseRepo);

    return responseRepo;
  }
}

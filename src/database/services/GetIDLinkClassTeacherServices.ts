/* eslint-disable */
import { LinkClassTeacherEntity } from "../entities/LinkClassTeacherEntity";
import { LinkClassTeacherEntityRepository, TeamRepository } from "../repositories";

import messagesGenerated from "../../lang";

export type IRequest = {
  teamId: string;
};

export class GetIDLinkClassTeacherServices {
  async execute({ teamId }: IRequest): Promise<LinkClassTeacherEntity[] | Error> {
    try {
      const TeamExist = await TeamRepository()
        .findOne(
          {
            where: { id: teamId },
          },
        );
      
      return await LinkClassTeacherEntityRepository().find({
        where: {
         team:TeamExist
        }
      })
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error?.message)
      }
      return new Error(messagesGenerated.ERROR_UNABLE_TO_REGISTER)
    }
  }
}

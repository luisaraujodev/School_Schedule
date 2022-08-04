/* eslint-disable */
import { createConnectionDB } from "../../database/index";

import { getRepository } from "typeorm";
import { Schedule } from "../entities/ScheduleEntity";
import { ScheduleDetail } from "../entities/ScheduleDetailEntity";
import { Classes } from "../entities/ClassesEntity";
import { GridTime } from "../entities/GridTimeEntity";
import { Shift } from "../entities/ShiftEntity";
import { ShiftDetail } from "../entities/ShiftDetailEntity";
import { Teaching } from "../entities/TeachingEntity";
import { Subjects } from "../entities/SubjectsEntity";
import { Teachers } from "../entities/TeachersEntity";
import { TeachersRestrictions } from "../entities/TeachersRestrictionsEntity";
import { Series } from "../entities/SeriesEntily";
import { DisciplineWorkload } from "../entities/DisciplineWorkloadEntity";
import { Team } from "../entities/TeamEntity";
import { TeamDetail } from "../entities/TeamDetailEntity";
import { LinkClassTeacherEntity } from "../entities/LinkClassTeacherEntity";

export const ScheduleRepository = () => getRepository(Schedule);
export const ScheduleDetailRepository = () => getRepository(ScheduleDetail);
export const ClassesRepository = () => getRepository(Classes);
export const GridTimeRepository = () => getRepository(GridTime);
export const ShiftRepository = () => getRepository(Shift);
export const ShiftDetailRepository = () => getRepository(ShiftDetail);
export const TeachingRepository = () => getRepository(Teaching);
export const SubjectsRepository = () => getRepository(Subjects);
export const TeachersRepository = () => getRepository(Teachers);
export const TeachersRestrictionsRepository = () => getRepository(TeachersRestrictions);
export const SeriesRepository = () => getRepository(Series);
export const DisciplineWorkloadRepository = () => getRepository(DisciplineWorkload);
export const TeamRepository = () => getRepository(Team);
export const TeamDetailRepository = () => getRepository(TeamDetail);
export const LinkClassTeacherEntityRepository = () => getRepository(LinkClassTeacherEntity);
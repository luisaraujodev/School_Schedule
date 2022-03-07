/* eslint-disable */
import { getRepository } from "typeorm";
import { Schedule } from "../entities/ScheduleEntity";
import { Classes } from "../entities/ClassesEntity";
import { GridTime } from "../entities/GridTimeEntity";
import { GridWeek } from "../entities/GridWeekEntity";
import { Shift } from "../entities/ShiftEntity";
import { Subjects } from "../entities/SubjectsEntity";
import { Teachers } from "../entities/TeachersEntity";
import { TeachersRestrictions } from "../entities/TeachersRestrictionsEntity";

export const ScheduleRepository = () => getRepository(Schedule);
export const ClassesRepository = () => getRepository(Classes);
export const GridTimeRepository = () => getRepository(GridTime);
export const GridWeekRepository = () => getRepository(GridWeek);
export const ShiftRepository = () => getRepository(Shift);
export const SubjectsRepository = () => getRepository(Subjects);
export const TeachersRepository = () => getRepository(Teachers);
export const TeachersRestrictionsRepository = () => getRepository(TeachersRestrictions);

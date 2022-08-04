/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */

import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { BaseEntity } from "./DefaultEntity";
import { Schedule } from "./ScheduleEntity";
import { Subjects } from "./SubjectsEntity";

@Entity("classes")
export class Classes extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.id)
  schedule: Schedule;

  @ManyToMany(() => Subjects)
  subject: Subjects[];
}

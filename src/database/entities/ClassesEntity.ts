/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import path from "path";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { BaseEntity } from "./DefaultEntity";
import { Schedule } from "./ScheduleEntity";
import { Shift } from "./ShiftEntity";
import { Subjects } from "./SubjectsEntity";

console.log(
  path.join(__dirname),
);

@Entity("classes")
export class Classes extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.id)
  schedule: Schedule;

  @ManyToOne(() => Shift, (shift) => shift.id)
  shift: Shift;

  @ManyToMany(() => Subjects)
  @JoinTable()
  subject: Subjects[];
}

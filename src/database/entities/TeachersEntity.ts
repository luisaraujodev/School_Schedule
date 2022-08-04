/* eslint-disable*/
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { BaseEntity } from "./DefaultEntity";
import { Shift } from "./ShiftEntity";
import { Subjects } from "./SubjectsEntity";
import { TeachersRestrictions } from "./TeachersRestrictionsEntity";

@Entity("teachers")
export class Teachers extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Shift, { cascade: true, eager: true })
  @JoinTable()
  shift: Shift[];

  @ManyToMany(() => Subjects, { cascade: true, eager: true })
  @JoinTable()
  subjects: Subjects[]

  @Column()
  workload: number;

  @OneToMany(() => TeachersRestrictions,
    (teachersRestrictions) => teachersRestrictions.teacher, { cascade: true, eager: true })
  teachersRestrictions: TeachersRestrictions[];
}

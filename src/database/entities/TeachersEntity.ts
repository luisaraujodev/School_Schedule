/* eslint-disable*/
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from "typeorm";

import { BaseEntity } from "./DefaultEntity";
import { Subjects } from "./SubjectsEntity";
import { TeachersRestrictions } from "./TeachersRestrictionsEntity";

@Entity("teachers")
export class Teachers extends BaseEntity {
  @Column()
  name: string;

  @Column()
  workload: number;

  @ManyToMany(() => TeachersRestrictions)
  @JoinTable()
  teachersRestrictions: TeachersRestrictions[];

  @ManyToMany(() => Subjects)
  @JoinTable()
  subject: Subjects[];
}

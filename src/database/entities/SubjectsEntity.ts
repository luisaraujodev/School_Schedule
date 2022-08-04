/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import {
  Entity, Column, OneToMany, ManyToMany,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Teachers } from "./TeachersEntity";
import { DisciplineWorkload } from "./DisciplineWorkloadEntity";

@Entity("subject")
export class Subjects extends BaseEntity {
  @Column()
  name: string;

  @Column()
  nickname: string;

  @ManyToMany(() => Teachers,
    (teachers) => teachers.subjects)
  teachers: Teachers[];

  @OneToMany(() => DisciplineWorkload,
    (disciplineWorkload) => disciplineWorkload.workload)
  disciplineWorkload: DisciplineWorkload[];
}

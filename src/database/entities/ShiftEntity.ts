/* eslint-disable */
import {
  Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { ShiftDetail } from "./ShiftDetailEntity";
import { Team } from "./TeamEntity";

@Entity("shift")
export class Shift extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Team,
    (teams) => teams.shift)
  teams: Team[];

  // @OneToMany(() => Teachers,
  //   (teachers) => teachers.subjects)
  // teachers: Teachers[];

  @OneToMany(() => ShiftDetail,
    (shiftDetail) => shiftDetail.shift, { cascade: true, eager: true })
  shiftDetail: ShiftDetail[];
}

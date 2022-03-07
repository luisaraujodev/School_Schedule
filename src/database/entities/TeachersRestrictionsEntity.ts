/* eslint-disable*/
import {
  Entity,
  JoinTable,
  ManyToMany,
} from "typeorm";

import { BaseEntity } from "./DefaultEntity";
import { GridTime } from "./GridTimeEntity";
import { GridWeek } from "./GridWeekEntity";

@Entity("TeachersRestrictions")
export class TeachersRestrictions extends BaseEntity {
  @ManyToMany(() => GridTime)
  @JoinTable()
  time: GridTime[];

  @ManyToMany(() => GridWeek)
  @JoinTable()
  gridweek: GridWeek[];
}

/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
import {
  Column, Entity, OneToMany,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Classes } from "./ClassesEntity";
import { GridTime } from "./GridTimeEntity";
import { GridWeek } from "./GridWeekEntity";

@Entity("shift")
export class Shift extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => GridTime,
    (gridtime) => gridtime.id,
    { cascade: true, eager: true })
  gridtime: GridTime[];

  @OneToMany(() => GridWeek,
    (gridweek) => gridweek.id,
    { cascade: true, eager: true })
  gridweek: GridWeek[];

  @OneToMany(() => Classes,
    (classes) => classes.id,
    { cascade: true, eager: true })
  classes: Classes[];
}

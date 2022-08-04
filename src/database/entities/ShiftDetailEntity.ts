/* eslint-disable */
import {
  Column, Entity, ManyToOne, OneToMany, OneToOne,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { GridTime } from "./GridTimeEntity";
import { Shift } from "./ShiftEntity";
// import { GridWeek } from "./GridWeekEntity";

@Entity("shiftDetail")
export class ShiftDetail extends BaseEntity {
  @ManyToOne(() => Shift,
    (shift) => shift.shiftDetail)
  shift: Shift;

  @ManyToOne(() => GridTime, (gridTime) => gridTime.id, { cascade: true, eager: true })
  gridTime: GridTime;

  @Column({ default: false })
  mon: boolean;

  @Column({ default: false })
  tue: boolean;

  @Column({ default: false })
  wed: boolean;

  @Column({ default: false })
  thu: boolean;

  @Column({ default: false })
  fri: boolean;

  @Column({ default: false })
  sat: boolean;

  @Column({ default: false })
  sun: boolean;
}

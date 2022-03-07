/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Shift } from "./ShiftEntity";

@Entity("gridweek")
export class GridWeek extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  disable: boolean;

  @ManyToOne(() => Shift, (shift) => shift.id)
  shift: Shift;
}

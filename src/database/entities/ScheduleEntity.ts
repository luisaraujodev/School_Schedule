/* eslint-disable*/
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { ScheduleDetail } from "./ScheduleDetailEntity";
import { Shift } from "./ShiftEntity";
import { Team } from "./TeamEntity";

@Entity("schedule")
export class Schedule extends BaseEntity {
  @ManyToOne(() => Shift, { cascade: true, eager: true })
  @JoinColumn()
  shift: Shift;

  @OneToMany(() => ScheduleDetail,
    (scheduleDetail) => scheduleDetail.schedule, { cascade: true, eager: true })
  scheduleDetail: ScheduleDetail[];
}

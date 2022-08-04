/* eslint-disable */
import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { GridTime } from "./GridTimeEntity";
import { Teachers } from "./TeachersEntity";
import { Schedule } from "./ScheduleEntity";
import { Team } from "./TeamEntity";

@Entity("scheduleDetail")
export class ScheduleDetail extends BaseEntity {
  @Column()
  dayWeek: string;

  @ManyToOne(() => Teachers, { cascade: true, eager: true })
  teacher: Teachers;

  @ManyToOne(() => Team, { cascade: true, eager: true })
  @JoinColumn()
  team: Team;

  @ManyToOne(() => GridTime, { cascade: true, eager: true })
  gridTime: GridTime;

  @ManyToOne(() => Schedule, (schedule) => schedule.scheduleDetail)
  schedule: Schedule;
}

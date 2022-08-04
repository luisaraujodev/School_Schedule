/* eslint-disable */
import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Shift } from "./ShiftEntity";
import { Series } from "./SeriesEntily";
import { TeamDetail } from "./TeamDetailEntity";

@Entity("team")
export class Team extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Shift,
    (shifts) => shifts.teams, { cascade: true, eager: true })
  shift: Shift;

  @ManyToOne(() => Series,
    (series) => series.teams, { cascade: true, eager: true })
  series: Series;

  @OneToMany(() => TeamDetail,
    (teamDetail) => teamDetail.team, { cascade: true, eager: true })
  teamDetail: TeamDetail[];
}

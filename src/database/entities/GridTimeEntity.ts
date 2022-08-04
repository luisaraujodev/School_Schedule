/* eslint-disable */
import {
  Column, Entity, OneToMany,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { TeamDetail } from "./TeamDetailEntity";
import { ShiftDetail } from "./ShiftDetailEntity";

@Entity("gridTime")
export class GridTime extends BaseEntity {
  @Column()
  name: string;

  @Column()
  position: number;

  @OneToMany(() => ShiftDetail,
    (shiftDetail) => shiftDetail.gridTime)
  shiftDetail: ShiftDetail[];

  @OneToMany(() => TeamDetail,
    (teamDetail) => teamDetail.gridTime)
    teamDetail: TeamDetail[];
}

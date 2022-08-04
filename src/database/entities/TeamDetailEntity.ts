/* eslint-disable */
import {
  Column, Entity, ManyToOne,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { GridTime } from "./GridTimeEntity";
import { Team } from "./TeamEntity";

@Entity("teamDetail")
export class TeamDetail extends BaseEntity {
  @ManyToOne(() => Team,
    (team) => team.teamDetail)
  team: Team;

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

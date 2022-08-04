/* eslint-disable */
import {
  Column, Entity, ManyToOne, OneToMany, OneToOne,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Series } from "./SeriesEntily";
import { Team } from "./TeamEntity";

@Entity("teaching")
export class Teaching extends BaseEntity {
  @Column()
  name: string;

  @Column()
  nickname: string;

  @OneToMany(() => Series,
    (series) => series.teaching)
  series: Series[];
}

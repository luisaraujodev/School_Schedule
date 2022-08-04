/* eslint-disable */
import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Teaching } from "./TeachingEntity";
import { Subjects } from "./SubjectsEntity";
import { Team } from "./TeamEntity";
import { DisciplineWorkload } from "./DisciplineWorkloadEntity";

@Entity("series")
export class Series extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Teaching,
    (teaching) => teaching.series, { cascade: true, eager: true })
  @JoinColumn()
  teaching: Teaching;

  @OneToMany(() => Team,
    (teams) => teams.series)
  teams: Team[];

  @OneToMany(() => DisciplineWorkload,
    (disciplineWorkload) => disciplineWorkload.series, { cascade: true, eager: true })
  disciplineWorkload: DisciplineWorkload[];
}

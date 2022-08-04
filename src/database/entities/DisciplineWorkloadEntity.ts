/* eslint-disable */
import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Series } from "./SeriesEntily";
import { Subjects } from "./SubjectsEntity";

@Entity("disciplineWorkload")
export class DisciplineWorkload extends BaseEntity {
  @Column()
  workload: number;

  @ManyToOne(() => Subjects, (subjects) => subjects.disciplineWorkload, { cascade: true, eager: true })
  subjects: Subjects

  @ManyToOne(() => Series,
    (series) => series.disciplineWorkload)
  series: Series;
}

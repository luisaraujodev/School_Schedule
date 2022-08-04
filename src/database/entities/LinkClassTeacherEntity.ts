/* eslint-disable */
import {
  Column, Entity, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne
} from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Subjects } from "./SubjectsEntity";
import { Teachers } from "./TeachersEntity";
import { Team } from "./TeamEntity";

@Entity("linkClassTeacherEntity")
export class LinkClassTeacherEntity extends BaseEntity {
  @ManyToOne(() => Team, { cascade: true, eager: true })
  @JoinColumn()
  team: Team

  @ManyToOne(() => Subjects, { cascade: true, eager: true })
  @JoinColumn()
  subject: Subjects

  @ManyToOne(() => Teachers, { cascade: true, eager: true })
  @JoinColumn()
  teacher: Teachers

  @Column()
  consecutiveClasses: number;
}

/* eslint-disable*/
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne
} from "typeorm";

import { BaseEntity } from "./DefaultEntity";
import { Teachers } from "./TeachersEntity";
import { GridTime } from "./GridTimeEntity";

@Entity("teachersRestrictions")
export class TeachersRestrictions extends BaseEntity {
  @ManyToOne(() => Teachers,
    (teacher) => teacher.teachersRestrictions)
  teacher: Teachers;

  @OneToOne(() => GridTime, (gridTime) => gridTime.id)
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

/* eslint-disable*/
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./DefaultEntity";
import { Classes } from "./ClassesEntity";

@Entity("schedule")
export class Schedule extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Classes,
    (classes) => classes.id)
  @JoinColumn()
  classes: Classes[];
}

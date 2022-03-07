/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { Entity, Column } from "typeorm";
import { BaseEntity } from "./DefaultEntity";

@Entity("subject")
export class Subjects extends BaseEntity {
  @Column()
  name: string;
}

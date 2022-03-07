/* eslint-disable import/prefer-default-export */
import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.created_at) {
      this.created_at = new Date().toJSON();
    }

    if (!this.updated_at) {
      this.updated_at = new Date().toJSON();
    }
  }
}

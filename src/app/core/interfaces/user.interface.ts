import { BaseEntity } from './base-entity.interface';

export enum Role {
  SuperAdmin,
  Admin,
  Agent,
  Manager,
  Client,
}

export interface User extends BaseEntity {
  first_name?: string;

  last_name?: string;

  role: Role;
}

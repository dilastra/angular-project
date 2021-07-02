import { BaseEntity } from './base-entity.interface';
import { User } from './user.interface';

export interface BankBase extends BaseEntity {
  name: string;
}

export interface Bank extends BankBase {
  ip_address: string;
  manager: User;
}

export type BankListResponse = Array<BankBase>;

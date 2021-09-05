export enum Role {
  SuperAdmin,
  Admin,
  Agent,
  Manager,
  Client,
}

export interface User {
  first_name?: string;
  id: string;
  last_name?: string;
  role: Role;
}

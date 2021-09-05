import { Command } from './command.interface';
import { File } from '../file.interface';
import { LeaseAcceptedAct } from './lease-accepted-act.interface';
import { LeaseContract } from './lease-contract.interface';
import { OrganizationRegistrationCertficate } from './org-reg-certificate.interface';

export interface ConstituentDocumentsClientCompany {
  command: Command;
  file: null | File;
  id: string;
  lease_acceptance_act: LeaseAcceptedAct;
  lease_contract: LeaseContract;
  org_reg_certificate: OrganizationRegistrationCertficate;
}

import { ClientCompanyBanks } from './client-copany-banks.interface';

export interface ClientCompany {
  address: string;
  id: string;
  inn: string;
  is_active: boolean;
  client_company_banks: ClientCompanyBanks[];
  kpp: string;
  name: string;
  ogrn: string;
  ogrn_date: string;
  product: number;
  tax_system: number;
  type: number;
}

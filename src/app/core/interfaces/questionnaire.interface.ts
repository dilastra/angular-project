export interface Questionnaire {
  id: string;
  number_employees: number | null;
  average_number_employees: number | null;
  flow_money_per_month: number | null;
  wage_arrears: number | null;
  account_type: number | null;
  bank_bic: string | null;
  bank_account: string | null;
  check_bic: boolean;
  manager_structure: number | null;
  staff: string | null;
  registered_usa: boolean;
  taxpayer_status: boolean;
  passive_fin_org: boolean;
  legal_rus: boolean;
  limited_suppliers: boolean;
  limited_buyers: boolean;
  contact_fullname: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  site: string | null;
}

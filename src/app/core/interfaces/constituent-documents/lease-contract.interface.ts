export interface LeaseContract {
  date_from: null | string;
  date_signing: null | string;
  date_to: null | string;
  doc_number: null | string;
  file: null | File;
  file_id?: string;
  id: string;
  ownership_type: number;
}

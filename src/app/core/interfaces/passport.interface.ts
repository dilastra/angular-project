import { File } from './file.interface';

export interface Passport {
  date_born: null | string;
  file_id?: null | File;
  date_from: null | string;
  file: null | File;
  first_name: null | string;
  id: string;
  issuer: null | string;
  issuer_code: null | string;
  last_name: null | string;
  middle_name: null | string;
  number: null | string;
  series: null | string;
}

import { Passport } from './passport.interface';
import { PlaceResidence } from './place-residence.interface';
import { Snils } from './snils.interface';

export interface Beneficiary {
  id: string;
  share: string | null;
  passport: Passport;
  place_residence: PlaceResidence;
  snils: Snils;
}

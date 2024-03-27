import { Pesel } from '@/util/parse-pesel';

export interface Patient {
    id: number;
    cardNumber: string;
    name: string;
    pesel: Pesel;
}

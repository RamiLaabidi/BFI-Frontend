import {ContratCredit} from "./contratCredit";

export interface Echeance {
    idE: number;
    datePaiement: Date;
    montantEcheance: number;
    mensualite: number;
    interetsPayes: number;
    capitalRembourse: number;
    capitalRestantDu: number;
    contratCredit?:ContratCredit;
}

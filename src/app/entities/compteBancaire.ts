import {Devise, EtatC, TCompte} from "../Enum/enums";
import {User} from "./user";

export interface CompteBancaire {
    idCompte: number;
    numeroCompte: number;
    solde: number;
    dateOvertureCompte: Date;
    typeCompte: TCompte;
    montantRouge: number;
    nombreDeRetardDePaiement: number;
  etatDeCompte: EtatC;
    deviceC: Devise;
    //user: User;
}

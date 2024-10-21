import {PieceJointe} from "./DTO/PieceJointeDTO";
import {Garantie} from "./DTO/GarantieDTO";


export interface Credit {
    idCredit: number;
    numD: string;
    dateDemande: Date;
    typeCredit: TypeCredit;
    typeUnite: TypeUnite;
    montant: number;
    dureeCredit: number;
    interet: number;
    statutCredit: StatutCredit;
    idUser: number;
    pieceJointes: PieceJointe[];
    garanties: Garantie[];



}
export enum TypeCredit {
    PERSONNEL = 'PERSONNEL',
    VOITURE = 'VOITURE',
    IMOBILIER = 'IMOBILIER',
    RENOVATION = 'RENOVATION'
    // Ajouter d'autres types selon vos besoins
}

export enum TypeUnite {
    MENSUELLE = 'MENSUELLE',
    TRIMESTRIELLE = 'TRIMESTRIELLE',
    SEMESTRIELLE = 'SEMESTRIELLE',
    ANNUELLE = 'ANNUELLE',

    // Ajouter d'autres unités selon vos besoins
}
export enum StatutCredit {
    ACCEPTÉE = 'ACCEPTÉE',
    REFUSÉE = 'REFUSÉE',
    EN_COURS = 'EN_COURS'
}

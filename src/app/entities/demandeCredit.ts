export interface DemandeCredit {
    idD?: number;
    date: Date;
    typeCredit: TypeC;
    unite?: TypeU;
    montant: number;
    dureeCredit: number;
    interet: number;
    status: DStatus;
    idUser: number;
}
export enum TypeC {
    PERSONNEL = 'PERSONNEL',
    VOITURE = 'VOITURE',
    IMMOBILIER = 'IMMOBILIER',
    RENOVATION = 'RENOVATION'
}

export enum TypeU {
    MENSUELLE = 'MENSUELLE',
    TRIMESTRIELLE = 'TRIMESTRIELLE',
    SEMESTRIELLE = 'SEMESTRIELLE',
    ANNUELLE = 'ANNUELLE'
}

export enum DStatus {
    ENCOURS = 'ENCOURS',
    APPROUVE = 'APPROUVE',
    REFUSE = 'REFUSE',
   
}

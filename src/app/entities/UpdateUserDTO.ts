import { LieuNaissance, SEXE, TypeSF } from "../Enum/enums";

export interface UpdateUserDTO {
    nom: string;
    prenom: string;
    email: string;
    dateNaiss: Date;
    formattedDateNaiss?: string;
    lieuNaiss: LieuNaissance;
    sexe: SEXE;
    situationFamiliale: TypeSF;
  }

import {EmploymentType, LieuNaissance, Role, SEXE, TypeSF} from "../Enum/enums";
import { CompteBancaire } from "./compteBancaire";

export interface User {
  formattedDateDeNaissance?: string;
  idU: number;
  role: Role;
  nom: string;
  prenom: string;
  dateDeNaissance: Date;
  situationFamiliale: TypeSF;
  profilePicture: string;
  numCin: number;
  lieuNaiss: LieuNaissance;
  sexe: SEXE;
  email: string;
  motDePasse: string;
  //revenuMensuel: number;
 // chargesMensuelles: number;
  salaire: number;
  employmentType: EmploymentType;
  age: number;
  compteBancaires: CompteBancaire[];
}

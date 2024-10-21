import { Devise } from "src/app/Enum/enums";

export interface Garantie {
    id: number;
    nature: string;
    valeur: number;
    devise: Devise;
  }

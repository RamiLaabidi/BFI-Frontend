import { EmploymentType } from "src/app/Enum/enums";

export interface UserDTO {
    revenuMensuel: number;
    salaire: number;
    chargesMensuelles: number;
    age: number;
    employmentType: EmploymentType;
  }
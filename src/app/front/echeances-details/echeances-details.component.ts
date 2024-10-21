import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Echeance} from "../../entities/echeance";

@Component({
  selector: 'app-echeances-details',
  templateUrl: './echeances-details.component.html',
  styleUrls: ['./echeances-details.component.css']
})
export class EcheancesDetailsComponent {
  echeances: Echeance[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EcheancesDetailsComponent>
  ) {
    this.echeances = data.echeances; // Receive echeances data from parent component
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

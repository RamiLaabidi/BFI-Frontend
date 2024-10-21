import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EcheancesDetailsComponent } from '../echeances-details/echeances-details.component';
import {Echeance} from "../../entities/echeance";
import {AuthService} from "../../services/auth.service";
import {DemandeCreditService} from "../../services/DemandeCredit.service";

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent {

  isDialogOpen = true;
  data: any;
  echeances: Echeance[] = [];
  showEcheances = true;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<DemandeDetailsComponent>,
    private dialog: MatDialog ,
    private authService: AuthService,
    private demandeCreditService: DemandeCreditService


  ) {
    this.data = dialogData;
  }


  viewEcheancier(): void {
    this.demandeCreditService.generateEcheances(this.data.montant, this.data.dureeCredit, this.data.typeCredit)
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.openEcheanceDetailsDialog(res);
        },
        error: (error) => {
          console.error('Error fetching échéances', error);
        }
      });
  }

  openEcheanceDetailsDialog(echeances: Echeance[]): void {
    this.dialog.open(EcheancesDetailsComponent, {
      data: { echeances },
      width: '80%',
      maxHeight: '80vh'
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

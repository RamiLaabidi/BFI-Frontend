import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompteBancaire } from "../../entities/compteBancaire";
import { AuthService } from "../../services/auth.service";
import { UserDTO } from "../../entities/DTO/UserDTO";
import {HttpErrorResponse} from "@angular/common/http";

export interface CreditDTO {
  montant: number;
}

@Component({
  selector: 'app-detail-demande-en-cours',
  templateUrl: './detail-demande-en-cours.component.html',
  styleUrls: ['./detail-demande-en-cours.component.css']
})
export class DetailDemandeEnCoursComponent {

  isDialogOpen = true;
  data: any;
  client: any;
  riskScore: number | null = null;
  riskLevel: string | null = null;
  compteBancaires?: CompteBancaire[];
  statusMessage: string | null = null;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private dialogRef: MatDialogRef<DetailDemandeEnCoursComponent>,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.data = this.dialogData;
    console.log('Dialog data:', this.data); // Log the dialog data
    if (this.data.idUser) {
      this.fetchClientDetails(this.data.idUser);
    } else {
      console.error('User ID is undefined.');
    }
  }

  fetchClientDetails(idU: number): void {
    this.authService.getUserById(idU).subscribe(
        user => {
          this.client = user;
          this.compteBancaires = user.compteBancaires;
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching client details:', error);
        }
    );
  }

  calculateScore(): void {
    const client: UserDTO = {
      revenuMensuel: this.client.revenuMensuel,
      salaire: this.client.salaire,
      chargesMensuelles: this.client.chargesMensuelles,
      age: this.client.age,
      employmentType: this.client.employmentType
    };
    this.authService.calculateScore(client).subscribe(score => {
      this.riskScore = score;
      console.log(this.riskScore);
      this.updateStatusMessage();
    });
  }

  evaluateRisk(): void {
    if (this.client && this.compteBancaires && this.compteBancaires.length > 0) {
      const demandeCredit: CreditDTO = { montant: this.data.montant };
      console.log(demandeCredit);
      this.authService.evaluateRisk(this.compteBancaires[0], demandeCredit).subscribe(
          riskLevel => {
            this.riskLevel = riskLevel;
            this.updateStatusMessage();
          },
          error => {
            this.riskLevel = 'Erreur lors de l\'évaluation du risque';
          }
      );
    }
  }

  updateStatusMessage(): void {
    if (this.riskScore !== null && this.riskLevel) {
      if (this.riskScore > 70 && this.riskLevel === 'faible') {
        this.statusMessage = 'Le client est légitime pour obtenir un crédit.';
      } else if (this.riskScore > 640 && this.riskLevel === 'modéré') {
        this.statusMessage = 'Le client est légitime pour obtenir un crédit avec des conditions.';
      } else {
        this.statusMessage = 'Le client n\'est pas légitime pour obtenir un crédit.';
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

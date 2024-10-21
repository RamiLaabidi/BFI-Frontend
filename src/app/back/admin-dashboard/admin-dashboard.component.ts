import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AuthService} from "../../services/auth.service";
import {Credit, StatutCredit} from "../../entities/Credit";
import {User} from "../../entities/user";
import {DetailDemandeEnCoursComponent} from "../detail-demande-en-cours/detail-demande-en-cours.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  nbreClients!: number;
  nbreDemandes!: number;
  nbreDemandesAcc!: number;
  nbreDemandesRej!: number;
  demandesEnCours: any[] = [];
  demandesAccRej: any[] = [];

  constructor(private authService: AuthService , private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.authService.getnbreClients().subscribe(
      (data) => {
        this.nbreClients = data;
      },
      (error) => {
        console.error('Error fetching client count', error);
      }
    );

    this.authService.getnbreDemandes().subscribe(
      (data) => {
        this.nbreDemandes = data;
      },
      (error) => {
        console.error('Error fetching demandes count', error);
      }
    );
    this.authService.getnbreDemandesAcc().subscribe(
      (data) => {
        this.nbreDemandesAcc = data;
      },
      (error) => {
        console.error('Error fetching demandes count', error);
      }
    );
    this.authService.getnbreDemandesRej().subscribe(
      (data) => {
        this.nbreDemandesRej = data;
      },
      (error) => {
        console.error('Error fetching demandes count', error);
      }
    );

    this.loadDemandesEnCours();
    this.loadDemandesAccRej();
  }

  loadDemandesEnCours() {
    this.authService.getAllDemandesCredit().subscribe((credits: Credit[]) => {
      credits.forEach((credit: Credit) => {
        if (credit.statutCredit === StatutCredit.EN_COURS) {
          this.authService.getUserById(credit.idUser).subscribe((user: User) => {
            this.demandesEnCours.push({
              ...credit,
              customerImage: user.profilePicture,
              customerName: `${user.nom} ${user.prenom}`
            });
          });
        }
      });
    });
  }

  loadDemandesAccRej() {
    this.authService.getAllDemandesCredit().subscribe((credits: Credit[]) => {
      credits.forEach((credit: Credit) => {
        if (credit.statutCredit === StatutCredit.ACCEPTÉE || credit.statutCredit === StatutCredit.REFUSÉE) {
          this.authService.getUserById(credit.idUser).subscribe((user: User) => {
            this.demandesAccRej.push({
              ...credit,
              customerImage: user.profilePicture,
              customerName: `${user.nom} ${user.prenom}`
            });
          });
        }
      });
    });
  }
  accepterD(demande: any) {
    this.updateStatus(demande.idCredit, StatutCredit.ACCEPTÉE);
  }

  refuserD(demande: any) {
    this.updateStatus(demande.idCredit, StatutCredit.REFUSÉE);
  }

  private updateStatus(id: number, status: StatutCredit) {
    this.authService.updateStatus(id, status).subscribe(
      response => {
        console.log('Demande mise à jour avec succès', response);
        this.demandesEnCours = this.demandesEnCours.filter(d => d.id !== id);
        if (status === StatutCredit.ACCEPTÉE || status === StatutCredit.REFUSÉE) {
          this.demandesAccRej.push(response);}
      },
      error => {
        console.error('Erreur lors de la mise à jour de la demande', error);
      }
    );
  }

  openDialog(demande: Credit): void {
    this.dialogRef.open(DetailDemandeEnCoursComponent, {
      data: demande,

    });
  }
}

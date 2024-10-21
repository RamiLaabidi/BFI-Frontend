import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DemandeDetailsComponent } from '../demande-details/demande-details.component';
import {Credit} from "../../entities/Credit";
import {AuthService} from "../../services/auth.service";
import {User} from "../../entities/user";

@Component({
  selector: 'app-demande-credit',
  templateUrl: './demande-credit.component.html',
  styleUrls: ['./demande-credit.component.css']
})
export class DemandeCreditComponent {
  demandes: Credit[] = [];
  currentUser!: User;


  constructor(
    private authService: AuthService,
    private dialogRef : MatDialog)
   { }


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.getDemandeByUserId(this.currentUser.idU);
  }

  getDemandeByUserId(id: number): void {
    this.authService.getDemandeByUserId(id).subscribe({
      next: (res) => {
        this.demandes = res;
        console.log(res);
      },
      error: (error) => {
        console.error('Error fetching demandes', error);
      }
    });
  }

  openDialog(demande: Credit): void {
    this.dialogRef.open(DemandeDetailsComponent, {
      data: demande,

    });
}
}

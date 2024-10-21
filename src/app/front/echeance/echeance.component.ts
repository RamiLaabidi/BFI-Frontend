import { Component, OnInit } from '@angular/core';
import { Echeance } from '../../entities/echeance';
import { AuthService } from '../../services/auth.service';
import {Credit} from "../../entities/Credit";


@Component({
    selector: 'app-echeance',
    templateUrl: './echeance.component.html',
    styleUrls: ['./echeance.component.css']
})
export class EcheanceComponent implements OnInit {
    echeances: Echeance[] = [];
    credit!:Credit
    montant?: number;
    dureeCredit?: number;
    typeCredit?: string;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        console.log('Received credit data:', this.credit);
        if (this.credit) {
            this.montant = this.credit.montant;
            this.dureeCredit = this.credit.dureeCredit;
            this.typeCredit = this.credit.typeCredit;
            console.log('Montant:', this.montant, 'Durée:', this.dureeCredit, 'Type de Crédit:', this.typeCredit);
            this.generateEcheances();
        } else {
            console.error('No credit data available.');
        }
    }

    generateEcheances(): void {
        if (this.montant !== undefined && this.dureeCredit !== undefined && this.typeCredit !== undefined) {
            console.log('Generating echeances with:', { montant: this.montant, dureeCredit: this.dureeCredit, typeCredit: this.typeCredit });
            this.authService.generateEcheances(this.montant, this.dureeCredit, this.typeCredit).subscribe(
                (data: Echeance[]) => {
                    this.echeances = data;
                },
                (error: any) => {
                    console.error('There was an error!', error.message || error);
                }
            );
        } else {
            console.error('Montant, durée, and type must be defined.');
        }
    }
}

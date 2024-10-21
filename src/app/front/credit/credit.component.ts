import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Credit} from "../../entities/Credit";


@Component({
    selector: 'app-demande-credit',
    templateUrl: './credit.component.html',
    styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
    credits: Credit[] = [];
    filteredCredits: Credit[] = [];
    currentUser: any;
    selectedDemandeCredit: Credit | null = null;
    searchId: string = '';


    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUser();
        if (this.currentUser && this.currentUser.idU) {
            this.authService.findAllCreditsByUser(this.currentUser.idU).subscribe(
                (data: Credit[]) => {
                    this.credits = data;
                    this.filteredCredits = data;
                },
                (error: any) => {
                    console.error('There was an error!', error);
                }
            );
        }
    }

    searchCreditById(): void {
        const id = Number(this.searchId);
        if (!isNaN(id) && id > 0) {
            this.authService.getCreditById(id).subscribe(
                (data: Credit) => {
                    this.filteredCredits = [data];
                },
                (error: any) => {
                    console.error('There was an error!', error);
                }
            );
        } else {
            this.filteredCredits = this.credits;
        }
    }


    getStatusStyles(status: string) {
        switch (status) {
            case 'APPROUVE':
                return { backgroundColor: '#0d5d1a' };
            case 'REFUSE':
                return { backgroundColor: '#d9534f' };
            case 'ENCOURS':
                return { backgroundColor: '#f0ad4e' };
            default:
                return {};
        }
    }


}



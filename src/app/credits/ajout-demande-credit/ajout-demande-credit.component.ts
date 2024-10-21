
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DemandeCreditService } from '../../services/DemandeCredit.service';
import { DemandeCredit, TypeC, TypeU, DStatus } from 'src/app/entities/demandeCredit';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { Echeance } from 'src/app/entities/echeance';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajout-demande-credit',
  templateUrl: './ajout-demande-credit.component.html',
  styleUrls: ['./ajout-demande-credit.component.css']
})
export class AjoutDemandeCreditComponent implements OnInit {
  echeances: Echeance[] = []; // Array to hold echeances
  creditForm!: FormGroup;
  typeCredits = Object.values(TypeC);
  units = Object.values(TypeU);
  statuses = Object.values(DStatus);
  todayDate!: string;

  // Define interest rates
  interestRates = {
    [TypeC.VOITURE]: 5.8,
    [TypeC.PERSONNEL]: 6,
    [TypeC.IMMOBILIER]: 4.9,
    [TypeC.RENOVATION]: 5.9
  };

  constructor(
      private fb: FormBuilder,
      private demandeCreditService: DemandeCreditService,
      private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit() {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    this.creditForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required], // yyyy-MM-dd format
      typeCredit: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      dureeCredit: ['', [Validators.required, Validators.min(1)]],
      interet: [{ value: '', disabled: true }, Validators.required], // Interest rate field
    });

    // Subscribe to changes in typeCredit
    this.creditForm.get('typeCredit')?.valueChanges.subscribe(value => {
      this.updateInterest(value);
    });
  }

  updateInterest(typeCredit: TypeC) {
    const interestRate = this.interestRates[typeCredit] || '';
    console.log('Updating interest rate for', typeCredit, 'to', interestRate);
    this.creditForm.get('interet')?.setValue(interestRate);
    this.creditForm.get('interet')?.updateValueAndValidity(); // Ensure the form control is updated
  }

  onSubmit() {
    console.log('Form Valid:', this.creditForm.valid);
    if (this.creditForm.valid) {
      const demandeCredit: DemandeCredit = this.creditForm.value;

      // Get the user ID from the token
      const decodedToken = this.authService.currentUser();
      const idUser = decodedToken?.idU;

      // Add the user ID to the demandeCredit object
      if (idUser) {
        demandeCredit.idUser = idUser;
      } else {
        console.error('User ID not found or token invalid.');
        return;
      }

      console.log('Form Values:', demandeCredit); // Should include 'idUser'
      this.demandeCreditService.createCredit(demandeCredit).subscribe(
          response => {
            console.log('Credit request created successfully', response);
            this.creditForm.reset();
          },
          error => {
            console.error('Error creating credit request', error);
          }
      );
    }
  }

  generateEcheances() {
    const { montant, dureeCredit, typeCredit } = this.creditForm.value;
    console.log('Montant:', montant);
    console.log('Duree:', dureeCredit);
    console.log('TypeCredit:', typeCredit);

    if (montant && dureeCredit && typeCredit) {
      this.demandeCreditService.generateEcheances(montant, dureeCredit, typeCredit).subscribe(
          (echeances: Echeance[]) => {
            // Sort the echeances array by datePaiement
            this.echeances = echeances.sort((a, b) => {
              return new Date(a.datePaiement).getTime() - new Date(b.datePaiement).getTime();
            });
          },
          error => {
            console.error('Error generating echeances', error);
          }
      );
    } else {
      console.error('Form values are not valid');
    }
  }


}

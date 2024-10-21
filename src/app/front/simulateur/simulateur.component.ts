import { Component } from '@angular/core';
import {TypeUnite} from "../../entities/Credit";

@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.component.html',
  styleUrls: ['./simulateur.component.css']
})
export class SimulateurComponent {

  typeUniteOptions = Object.values(TypeUnite);
  loanAmount: number = 4000;
  loanTerm: number = 12;
  Payment: number = 357;
  selectedCreditType: 'Crédit personnel' | 'Crédit Aménagement' | 'Crédit Auto Neuve' | 'Crédit Auto Occasion' = 'Crédit personnel';
  creditUnit: TypeUnite = TypeUnite.MENSUELLE;

  interestRates: { [key in 'Crédit personnel' | 'Crédit Aménagement' | 'Crédit Auto Neuve' | 'Crédit Auto Occasion']: number } = {
    'Crédit personnel': 5,
    'Crédit Aménagement': 4.5,
    'Crédit Auto Neuve': 4,
    'Crédit Auto Occasion': 4.2
  };

  selectCreditType(creditType: 'Crédit personnel' | 'Crédit Aménagement' | 'Crédit Auto Neuve' | 'Crédit Auto Occasion') {
    this.selectedCreditType = creditType;
    this.calculatePayment();
  }

  simulateur(montant: number, duree: number, interet: number, unite: TypeUnite): number {
    // Calcul du taux d'intérêt annuel, trimestriel et semestriel à partir du taux mensuel
    const interetAnnuelle = Math.pow(1 + interet / 100, 12) - 1;
    const interetTrimestriel = Math.pow(1 + interet / 100, 3) - 1;
    const interetSemestrielle = Math.pow(1 + interet / 100, 6) - 1;

    // Ajustement du taux d'intérêt et du nombre d'échéances en fonction de l'unité
    switch (unite) {
      case TypeUnite.MENSUELLE:
        // Le taux d'intérêt est déjà mensuel, aucune conversion nécessaire
        interet = interet / 100;
        break;
      case TypeUnite.TRIMESTRIELLE:
        interet = interetTrimestriel;
        duree /= 3; // Convertir le nombre d'échéances en trimestrielles
        break;
      case TypeUnite.SEMESTRIELLE:
        interet = interetSemestrielle;
        duree /= 6; // Convertir le nombre d'échéances en semestrielles
        break;
      case TypeUnite.ANNUELLE:
        interet = interetAnnuelle;
        duree /= 12; // Convertir le nombre d'échéances en annuelles
        break;
    }

    // Calcul du montant total à payer en tenant compte de l'intérêt
    const montantTotal = montant * (1 + interet * duree);

    // Montant à payer par échéance
    return montantTotal / duree;
  }

  calculatePayment() {
    const interestRate = this.interestRates[this.selectedCreditType];
    this.Payment = this.simulateur(this.loanAmount, this.loanTerm, interestRate, this.creditUnit);
    this.Payment = parseFloat(this.Payment.toFixed(2));
  }
}

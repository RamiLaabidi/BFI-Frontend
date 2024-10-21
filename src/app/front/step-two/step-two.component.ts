import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Credit, TypeCredit, TypeUnite} from "../../entities/Credit";

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent {
  @Input() demandeCredit!: Credit;
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() updateData = new EventEmitter<Partial<Credit>>();

  typeCreditOptions = Object.values(TypeCredit);
  typeUniteOptions = Object.values(TypeUnite);

  updateTypeCredit(event: any) {
    this.updateData.emit({ typeCredit: event.target.value });
  }

  updateTypeUnite(event: any) {
    this.updateData.emit({ typeCredit: event.target.value });
  }

  updateMontant(event: any) {
    this.updateData.emit({ montant: +event.target.value });
  }

  updateDuree(event: any) {
    this.updateData.emit({ dureeCredit: +event.target.value }); }

  updateInteret(event: any) {
    const value = parseFloat(event.target.value);

  if (!isNaN(value) && value >= 0) {
    this.demandeCredit.interet = value;
  } else {
    this.demandeCredit.interet = 0; // Reset or handle invalid input as needed
  }
  this.updateData.emit({ interet: +event.target.value })
}


}

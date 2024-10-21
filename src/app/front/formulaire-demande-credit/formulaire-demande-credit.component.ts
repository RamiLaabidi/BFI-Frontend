import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../entities/user";
import {Credit, StatutCredit, TypeCredit, TypeUnite} from "../../entities/Credit";
import {SEXE, TypeSF} from "../../Enum/enums";
import {AuthService} from "../../services/auth.service";
import {Garantie} from "../../entities/DTO/GarantieDTO";

@Component({
  selector: 'app-formulaire-demande-credit',
  templateUrl: './formulaire-demande-credit.component.html',
  styleUrls: ['./formulaire-demande-credit.component.css']
})
export class FormulaireDemandeCreditComponent {

  sexeOptions = Object.values(SEXE);
  situationFamilialeOptions = Object.values(TypeSF);
  step = 1;
  currentUser! :User
  demandeCredit: Credit = {
    idCredit: 0,
    dateDemande: new Date(),
    numD: '',
    typeCredit: TypeCredit.VOITURE,
    statutCredit: StatutCredit.EN_COURS,
    typeUnite: TypeUnite.MENSUELLE,
    montant: 0,
    interet: 0,
    dureeCredit: 0,
    pieceJointes: [],
    garanties: [],
    idUser: 0
  };





  constructor( private authService :AuthService, private router :Router){}


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.demandeCredit.idUser = this.currentUser.idU;
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  submitForm() {
    this.authService.createDemandeCredit(this.demandeCredit).subscribe(response => {
      this.demandeCredit.idCredit = response.idCredit; // Assume response contains the new ID
      console.log('Form submitted!', this.demandeCredit);
      this.router.navigate(['/']);
    });
  }


}

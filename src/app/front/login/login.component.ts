import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {User} from "../../entities/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isLoginFormActive: boolean = true;



  toggleForm() {
    this.isLoginFormActive = !this.isLoginFormActive;
  }

  loginForm: FormGroup;
  loginError: string = '';

  signupForm: FormGroup;
  signupError: string = '';

  currentUser! :User;

    constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        motDePasse: ['']
      });

      this.signupForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        numCin: ['', [Validators.required, this.cinValidator]],
        email: ['', [Validators.required, Validators.email]],
        motDePasse: ['', Validators.required],
        dateNaiss: ['', [Validators.required, this.ageValidator(18)]],
        role: ['CLIENT']
      });
    }

    private cinValidator(control: AbstractControl): { [key: string]: any } | null {
      const valid = /^\d{8}$/.test(control.value);
      return valid ? null : { invalidCin: true };
    }

    // Custom validator for age
    private ageValidator(minAge: number) {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const birthDate = new Date(control.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= minAge ? null : { underAge: true };
      };
    }

  signupSubmit() {
    const nomControl = this.signupForm.get('nom');
    const prenomControl = this.signupForm.get('prenom');
    const numCinControl = this.signupForm.get('numCin');
    const emailControl = this.signupForm.get('email');
    const motDePasseControl = this.signupForm.get('motDePasse');
    const dateNaissControl = this.signupForm.get('dateNaiss');

    if (emailControl && motDePasseControl && emailControl.valid && motDePasseControl.valid && nomControl && prenomControl && nomControl.valid && prenomControl.valid && numCinControl && numCinControl.valid && dateNaissControl && dateNaissControl.valid ) {
      this.signupError = '';

      this.auth.signup(this.signupForm.value).subscribe({
        next: (result) => {
          // this.router.navigate(['/login']);
          this.isLoginFormActive = true;
        },
        error: (err) => {
          this.signupError = "Erreur d'authentification";
          console.log(this.signupError);
        },
      });

    } else {
      this.signupError = 'Please enter valid credentials';
      console.log(this.signupError);
    }
    console.log(this.signupForm.value);
  }

  loginSubmit() {
    const emailControl = this.loginForm.get('email');
    const motDePasseControl = this.loginForm.get('motDePasse');

    if (emailControl && motDePasseControl && emailControl.valid && motDePasseControl.valid) {
      const email = emailControl.value;
      const motDePasse = motDePasseControl.value;
      this.loginError = '';

      let credentials = {
        email: email,
        motDePasse: motDePasse
      }

      this.auth.login(credentials).subscribe({
        next: (result) => {
          console.log(result)
          this.auth.setToken(result.access_token);
        const currentUser = this.auth.currentUser();

        if (currentUser && currentUser.role === 'ADMIN') {
          this.router.navigate(['/adminDashboard']);
        } else {
          this.router.navigate(['/profile/user']);
        }

        },
        error: (err) => {
          this.loginError = "Erreur d'authentification";
        },
      });
    } else {
      this.loginError = 'Please enter valid credentials';
    }
  }


  }



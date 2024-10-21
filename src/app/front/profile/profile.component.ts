import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {User} from "../../entities/user";
import { CompteBancaire } from "../../entities/compteBancaire";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {SEXE,TypeSF,EmploymentType, LieuNaissance} from "../../Enum/enums";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  accounts: CompteBancaire[] = [];
  currentUser: User;
  lieuNaissanceOptions = Object.values(LieuNaissance);
  sexeOptions = Object.values(SEXE);
  situationFamilialeOptions = Object.values(TypeSF);

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.currentUser();
    console.log(this.currentUser);
  }

  ngOnInit(): void {
    this.getUserData(this.currentUser.idU);
  }

  getUserData(idU: number): void {
    this.authService.getUserById(idU).subscribe({
      next: (data: User) => {
        if (data.dateDeNaissance) {
          data.formattedDateDeNaissance = this.formatDate(new Date(data.dateDeNaissance));
        }
        console.log(data)
        this.user = data;
        this.accounts = data.compteBancaires;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/']);
        }
      }
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.user) {
      this.authService.updateUser(this.currentUser.idU, this.user).subscribe({
        next: (updatedUser) => {
          if (updatedUser.dateDeNaissance) {
            updatedUser.formattedDateDeNaissance = this.formatDate(new Date(updatedUser.dateDeNaissance));
          }
          console.log('User updated successfully:', updatedUser);
          this.getUserData(this.currentUser.idU);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating user data', err);
        }
      });
    }

  }
}

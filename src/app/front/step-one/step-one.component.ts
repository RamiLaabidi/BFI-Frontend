import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {SEXE, TypeSF} from "../../Enum/enums";
import {User} from "../../entities/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent {
  user!: User ;
  currentUser: User;

  sexeOptions = Object.values(SEXE);
  situationFamilialeOptions = Object.values(TypeSF);

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.currentUser();
    console.log(this.currentUser);
  }

  ngOnInit(): void {
    this.getUserData(this.currentUser.idU);
  }

  getUserData(id: number): void {
    this.authService.getUserById(id).subscribe({
      next: (data: User) => {
        if (data.dateDeNaissance) {
          data.formattedDateDeNaissance = this.formatDate(new Date(data.dateDeNaissance));
        }
        console.log(data)
        this.user = data;

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
}

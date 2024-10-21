import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../entities/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  currentUser!: User ;

  constructor(public auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser(): void {
    const currentUserData = this.auth.currentUser();
    this.auth.getUserById(currentUserData.idU).subscribe({
      next: (user: User) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

logout():void{
this.auth.logout();
this.router.navigate(["/login"]);
}
}

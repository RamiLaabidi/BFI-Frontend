import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {

  constructor(public auth: AuthService, private router: Router) {}



    logout(): void {
      this.auth.logout();
      this.router.navigate(['/']);
    }



}

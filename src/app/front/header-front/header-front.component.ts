import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent implements OnInit {

  menuOpen = false;
  currentUser: any = null;


  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.currentUser = {imagePath: 'path/to/default/image.png'}; // Replace with actual user details fetching logic
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}




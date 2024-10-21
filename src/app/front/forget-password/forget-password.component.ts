import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email!: string;
  errorMessage!: string;


  constructor(private authService: AuthService) { }


  onSubmit() {
    this.authService.sendResetPasswordEmail(this.email).subscribe(
      response => {
        console.log('Email sent successfully:', response);
        alert('Email sent successfully');
      },
      error => {
        console.error('Error sending email:', error);
        this.errorMessage = 'Invalid email.';
      }
    );
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string;
  password!: string;
  confirmPassword!: string;
  formSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token') as string;

  }

  onSubmit() {
    this.formSubmitted = true;

    // Validate password and confirmPassword
    if (this.password !== this.confirmPassword) {
      return; // Let the template handle displaying the error message
    }

    // Call resetPassword API
    this.authService.resetPassword(this.token, this.password).subscribe(
      response => {
        console.log('Password reset successfully:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error resetting password:', error);
      }
    );
  }
}

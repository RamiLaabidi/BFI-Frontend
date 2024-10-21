import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ChangePasswordRequest} from "../../entities/ChangePasswordRequest";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-security-admin',
  templateUrl: './security-admin.component.html',
  styleUrls: ['./security-admin.component.css']
})
export class SecurityAdminComponent {

  passwordFieldType: string = 'password';


  changePasswordRequest: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmationPassword: ''
  };

  constructor(private authService: AuthService, private router : Router) { }

  onSubmit() {
    if (this.changePasswordRequest.newPassword !== this.changePasswordRequest.confirmationPassword) {
      alert('New password and confirmation password do not match');
      return;
    }

    this.authService.changePassword(this.changePasswordRequest).subscribe(
      () => {
        alert('Password changed successfully');
       this.router.navigate(['/adminDashboard']);
      },
      error => {
        console.error('Error changing password', error);
        alert('Failed to change password');
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  onReset(form: NgForm) {
    form.resetForm();
    this.changePasswordRequest = {
      currentPassword: '',
      newPassword: '',
      confirmationPassword: ''
    };
  }



}



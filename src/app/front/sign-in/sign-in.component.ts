import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor() {}

  signIn(): void {
    // Here you can implement your login logic
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Example: Implementing authentication logic
    if (this.username === 'admin' && this.password === 'password') {
      console.log('Login successful');
      // Redirect or perform further actions after successful login
    } else {
      console.log('Login failed');
      // Handle login failure
    }
  }
}

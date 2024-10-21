import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {User} from "../../entities/user";
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 // currentUser: User | null = null;
  currentUser!: User;
  selectedFile!: File;

  constructor(public auth: AuthService, private router: Router) {
    this.currentUser = this.auth.currentUser();
    console.log(this.currentUser);
  }
  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser(): void {
    const currentUserData = this.auth.currentUser();
    this.auth.getUserById(currentUserData.id).subscribe({
      next: (user: User) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.uploadProfilePicture();
    }
  }

  triggerFileInputClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  uploadProfilePicture(): void {
    if (this.selectedFile) {
      this.auth.uploadProfilePicture(this.currentUser.idU, this.selectedFile).subscribe({
        next: (response: string) => {
          console.log('Profile picture uploaded successfully:', response);
          this.router.navigate(['/profile']);
          this.fetchCurrentUser();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error uploading profile picture', err);
        }
      });
    } else {
      console.error('No file selected');
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}

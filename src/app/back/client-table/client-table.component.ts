import { Component } from '@angular/core';
import {User} from "../../entities/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent {
  authors: User[] = []; // Rename to authors if you want to match the template

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllClients().subscribe(
      (data: User[]) => {
        this.authors = data; // Assign data to authors
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe(
        response => {
          console.log(response);
          this.authors = this.authors.filter(author => author.idU !== id);
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

}

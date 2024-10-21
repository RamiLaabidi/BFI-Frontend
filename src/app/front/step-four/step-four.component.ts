import { Component, EventEmitter, Input, Output } from '@angular/core';
import {PieceJointe} from "../../entities/DTO/PieceJointeDTO";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent {
  @Input() pieceJointes: PieceJointe[] = [];
  @Output() updatePieceJointes = new EventEmitter<PieceJointe[]>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  obligatoire: boolean = false; // Set this as needed
  selectedFiles: PieceJointe[] = []; // Track multiple files

  constructor(private authService: AuthService) {}

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    Array.from(files).forEach(file => {
      if (file && file.type === 'application/pdf') {
        const pieceJointe: PieceJointe = {
          data: file,
          nomFichier: file.name,
          typeMime: file.type,
          taille: file.size
        };
        this.selectedFiles.push(pieceJointe);
      } else {
        alert('Please upload a valid PDF file.');
      }
    });
    this.updatePieceJointes.emit(this.selectedFiles);
  }

  removeFile(fileToRemove: PieceJointe) {
    this.selectedFiles = this.selectedFiles.filter(file => file !== fileToRemove);
    this.updatePieceJointes.emit(this.selectedFiles);
  }

  uploadFile() {
    this.selectedFiles.forEach(pieceJointe => {
      if (pieceJointe.data) {
        this.authService.uploadFile(pieceJointe.data, this.obligatoire)
          .subscribe(
            response => {
              console.log('Upload successful', response);
              // Handle successful upload response
            },
            error => {
              console.error('Upload error', error);
              // Handle error response
            }
          );
      }
    });
  }

  next() {
    this.nextStep.emit();
  }

  previous() {
    this.previousStep.emit();
}
}

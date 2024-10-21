import { Component, OnInit } from '@angular/core';
import { Credit } from '../../entities/Credit';
import { AuthService } from '../../services/auth.service';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { User } from 'src/app/entities/user';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-acepted-credit',
  templateUrl: './acepted-credit.component.html',
  styleUrls: ['./acepted-credit.component.css']
})
export class AceptedCreditComponent implements OnInit {
  acceptedCredits: Credit[] = [];
  currentUser!: User;
  signature: ArrayBuffer | null = null;

  constructor(private authService: AuthService, private pdfGeneratorService: PdfGeneratorService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    this.getAcceptedCreditsByUserId(this.currentUser.idU);
  }

  getAcceptedCreditsByUserId(id: number): void {
    this.authService.getDemandeByUserId(id).subscribe({
      next: (res) => {
        this.acceptedCredits = res.filter(demande => demande.statutCredit === 'ACCEPTÉE');
        console.log(this.acceptedCredits);
      },
      error: (error) => {
        console.error('Error fetching accepted credits', error);
      }
    });
  }

  generatePDF(id: number) {
    console.log('Signature:', this.signature); // Check the value of signature
    if (this.signature === null) {
      console.error('Signature is null');
      return;
    }
  
    // Fetch contract details
    this.authService.getCreditById(id).subscribe(
      (contract: Credit) => {
        // Fetch user details
        this.authService.getUserById(contract.idUser).subscribe(
          (user: User) => {
            // Generate PDF with contract and user details
            this.pdfGeneratorService.generateContractPDF(contract, this.signature, user)
              .then(pdfBytes => {
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
              })
              .catch(error => {
                console.error('Error generating PDF:', error);
              });
          },
          error => {
            console.error('Error fetching user details:', error);
          }
        );
      },
      error => {
        console.error('Error fetching contract details:', error);
      }
    );
  }
  
  
  captureSignature(signatureDataUrl: string) {
    const signatureDataArrayBuffer = this.dataURLToArrayBuffer(signatureDataUrl);
    if (signatureDataArrayBuffer) {
      this.signature = signatureDataArrayBuffer;
    } else {
      console.error('Error converting signature data URL to ArrayBuffer');
    }
  }

  dataURLToArrayBuffer(dataURL: string): ArrayBuffer | null {
    const byteString = atob(dataURL.split(',')[1]);
    const byteStringLength = byteString.length;
    const arrayBuffer = new ArrayBuffer(byteStringLength);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteStringLength; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return arrayBuffer;
  }
}

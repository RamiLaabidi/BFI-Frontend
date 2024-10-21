import { Injectable } from '@angular/core';
import { Credit } from '../entities/Credit';
import { PDFDocument, rgb } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  async generateContractPDF(contract: Credit, signature: ArrayBuffer | null, user: User): Promise<Uint8Array> {
    if (signature === null) {
      console.error('Signature is null');
      return new Uint8Array(); // Handle the null case appropriately
    }

    try {
      // Load the logo image
      const logoPath = 'assets/front/img/logo.png'; // Adjust path as needed
      const logoImageBytes = await this.getImageAsArrayBuffer(logoPath);

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]); // Define page size (optional)

      // Embed and draw the logo image
      const logoImage = await pdfDoc.embedPng(logoImageBytes);
      const { width, height } = logoImage.scale(0.15);
      page.drawImage(logoImage, { x: 50, y: 720, width, height });

      // Set up the header
      page.setFontSize(16);
      page.drawText('Contrat de Crédit', { x: 200, y: 730, color: rgb(0, 0, 0) });

      // Draw the contract details
      page.setFontSize(12);
      const startDateFormatted = this.datePipe.transform(contract.dateDemande, 'dd/MM/yyyy');
      const fontSize = 12;
      const yOffset = 650;
      page.drawText(`Entre les soussignés:`, { x: 50, y: yOffset });
      page.drawText(`- Le prêteur: BFI Groupe`, { x: 50, y: yOffset - 20 });
      page.drawText(`- L'emprunteur: ${user.nom} ${user.prenom}`, { x: 50, y: yOffset - 40 });

      page.drawText(`1. Détails du Crédit:`, { x: 50, y: yOffset - 80 });
      page.drawText(`   - Montant du crédit: ${contract.montant} DT`, { x: 50, y: yOffset - 100 });
      page.drawText(`   - Durée: ${contract.dureeCredit} mois`, { x: 50, y: yOffset - 120 });
      page.drawText(`   - Type de crédit: ${contract.typeCredit}`, { x: 50, y: yOffset - 140 });
      page.drawText(`   - Taux d'intérêt: ${contract.interet}%`, { x: 50, y: yOffset - 160 });
      page.drawText(`   - Date de début: ${startDateFormatted}`, { x: 50, y: yOffset - 180 });

      page.drawText(`2. Modalités de Remboursement:`, { x: 50, y: yOffset - 220 });
      page.drawText(`   - Remboursement mensuel`, { x: 50, y: yOffset - 240 });

      page.drawText(`   Signature de l'emprunteur:`, { x: 380, y: yOffset - 460 });

      // Draw the signature
      await this.drawSignature(pdfDoc, page, signature);

      // Save and return the PDF document
      return await pdfDoc.save();

    } catch (error) {
      console.error('Error generating PDF:', error);
      return new Uint8Array(); // Handle errors appropriately
    }
  }

  // Function to load local image as ArrayBuffer
  private async getImageAsArrayBuffer(url: string): Promise<ArrayBuffer> {
    try {
      const response = await this.http.get(url, { responseType: 'arraybuffer' }).toPromise();
      return response as ArrayBuffer;
    } catch (error) {
      console.error('Error loading image:', error);
      throw error; // Propagate error for handling in calling method
    }
  }

  // Draw the signature on the PDF
  async drawSignature(pdfDoc: PDFDocument, page: any, signatureImageBytes: ArrayBuffer | null) {
    if (signatureImageBytes === null) {
      console.error('Signature is null');
      return;
    }

    try {
      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
      const { width, height } = signatureImage.scale(0.5);
      page.drawImage(signatureImage, { x: 400, y: 90, width, height });
    } catch (error) {
      console.error('Error drawing signature:', error);
    }
  }
}

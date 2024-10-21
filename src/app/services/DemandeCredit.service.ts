import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeCredit } from 'src/app/entities/demandeCredit';// Adjust the path as necessary
import { Echeance } from 'src/app/entities/echeance';
@Injectable({
  providedIn: 'root'
})
export class DemandeCreditService {

  private baseUrl = 'http://localhost:8222/credit'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) { }


  createCredit(credit: DemandeCredit): Observable<DemandeCredit> {
    return this.http.post<DemandeCredit>(`${this.baseUrl}/add`, credit);
  }

  updateCredit(id: number, credit: DemandeCredit): Observable<DemandeCredit> {
    return this.http.put<DemandeCredit>(`${this.baseUrl}/${id}`, credit);
  }

  deleteCredit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCreditById(id: number): Observable<DemandeCredit> {
    return this.http.get<DemandeCredit>(`${this.baseUrl}/${id}`);
  }


 // Method to generate Echeances
 generateEcheances(montant: number, duree: number, typeCredit: string): Observable<Echeance[]> {
  return this.http.post<Echeance[]>(`${this.baseUrl}/generate`, null, {
    params: {
      montant: montant.toString(),
      duree: duree.toString(),
      typeCredit: typeCredit // Pass typeCredit instead of interet
    }
  });
}

  findAllCreditsByUser(idUser: number): Observable<DemandeCredit[]> {
    return this.http.get<DemandeCredit[]>(`${this.baseUrl}/user/${idUser}`);
  }
}

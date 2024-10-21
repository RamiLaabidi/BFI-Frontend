import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from "../entities/user";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Credit, StatutCredit} from "../entities/Credit";
import {Echeance} from "../entities/echeance";
import {CompteBancaire} from "../entities/compteBancaire";
import {ChangePasswordRequest} from "../entities/ChangePasswordRequest";
import {UserDTO} from "../entities/DTO/UserDTO";
import {CreditDTO} from "../entities/DTO/CreditDTO";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = 'http://localhost:8222/auth/';
  private apiUser: string = 'http://localhost:8222/user/';
  private baseUrl = 'http://localhost:8222/credit'; // Update with your backend URL
  private apiLoan: string = 'http://localhost:8222/evaluation/';
  private apiEcheance: string = 'http://localhost:8222/echeances/';
  private apiPieceJointe : string ='http://localhost:8222/piece-jointes/'

  constructor(private http: HttpClient) {
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}login`, credentials);
  }

  signup(author: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}register`, author);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  currentUser(token: string = this.getToken()): any {
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    return decoded;
  }


  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiURL}user/refresh-token`, {});
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.apiURL}forgot-password`, {}, {params});
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}reset-password`, {token, password});
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUser}id/${id}`);
  }




  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUser}${id}`, user);
  }

  getCreditById(id: number): Observable<Credit> {
    return this.http.get<Credit>(`${this.baseUrl}/${id}`);
  }

  findAllCreditsByUser(idUser: number): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.baseUrl}/user/${idUser}`);
  }





  getnbreClients() : Observable<number> {
    return this.http.get<number> (`${this.apiUser}nbreClients`)
  }
  uploadProfilePicture(idUser: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUser}uploadProfilePicture/${idUser}`, formData, { responseType: 'text' });
  }
  getAllClients(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUser}clients`);
  }
  deleteUser(idU: number): Observable<any> {
    return this.http.delete(`${this.apiUser}delete/${idU}`, { responseType: 'text' });
  }
  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.patch<any>(`${this.apiUser}changePassword`, request);
  }

  calculateScore(user: UserDTO): Observable<number> {
    return this.http.post<number>(`${this.apiLoan}calculateScore`, {user});
  }

  evaluateRisk(compteBancaire: CompteBancaire, credit: CreditDTO): Observable<string> {
    return this.http.post<string>(`${this.apiLoan}evaluate`, {
      compteBancaire,
      credit
    }, { responseType: 'text' as 'json' });

  }

  createDemandeCredit(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(this.baseUrl, credit);
  }

  getDemandeByUserId(id: number): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.baseUrl}/user/${id}`);
  }
  getnbreDemandes() : Observable<number> {
    return this.http.get<number> (`${this.baseUrl}/nbreDemandes`)
  }
  getnbreDemandesAcc() : Observable<number> {
    return this.http.get<number> (`${this.baseUrl}/nbreDemandesAcc`)
  }
  getnbreDemandesRej() : Observable<number> {
    return this.http.get<number> (`${this.baseUrl}/nbreDemandesRej`)
  }
  generateEcheances(montant: number, dureeCredit: number, typeCredit: string): Observable<Echeance[]> {
    // Prepare URL parameters
    const params = new HttpParams()
        .set('montant', montant.toString())
        .set('dureeCredit', dureeCredit.toString())
        .set('typeCredit', typeCredit);

    return this.http.post<Echeance[]>(`${this.apiEcheance}generateEcheances`, null, { params });
  }

  getAllDemandesCredit(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.baseUrl}`);
  }


  updateStatus(id: number, statut: StatutCredit): Observable<any> {
    const payload = { statut: statut };  // Wrap the status in an object
    return this.http.patch(`${this.baseUrl}/${id}/status`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }

  uploadFile(file: File, obligatoire: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('obligatoire', obligatoire.toString());

    return this.http.post(`${this.apiPieceJointe}upload`, formData, {
      responseType: 'text' // Adjust response type as needed
    });
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from './front/all-template-front/all-template-front.component';
import { HomeFrontComponent } from './front/home-front/home-front.component';
import { HeaderFrontComponent } from './front/header-front/header-front.component';
import { FooterFrontComponent } from './front/footer-front/footer-front.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignInComponent } from './front/sign-in/sign-in.component';
import {LoginComponent} from "./front/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {ProfileComponent} from "./front/profile/profile.component";
import {SidebarComponent} from "./front/sidebar/sidebar.component";
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CreditComponent} from "./front/credit/credit.component";
import { AceptedCreditComponent } from './front/acepted-credit/acepted-credit.component';
import { EcheanceComponent } from './front/echeance/echeance.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {AdminDashboardComponent} from "./back/admin-dashboard/admin-dashboard.component";
import {AdminNavbarComponent} from "./back/admin-navbar/admin-navbar.component";
import {AdminSidebarComponent} from "./back/admin-sidebar/admin-sidebar.component";
import {DetailDemandeEnCoursComponent} from "./back/detail-demande-en-cours/detail-demande-en-cours.component";
import {ClientTableComponent} from "./back/client-table/client-table.component";
import {ProfilAdminComponent} from "./back/profil-admin/profil-admin.component";
import {SecurityAdminComponent} from "./back/security-admin/security-admin.component";
import {SimulateurComponent} from "./front/simulateur/simulateur.component";
import {ResetPasswordComponent} from "./front/reset-password/reset-password.component";
import {ForgetPasswordComponent} from "./front/forget-password/forget-password.component";
import {EcheancesDetailsComponent} from "./front/echeances-details/echeances-details.component";
import {DemandeCreditComponent} from "./front/demande-credit/demande-credit.component";
import {DemandeDetailsComponent} from "./front/demande-details/demande-details.component";
import { AjoutDemandeCreditComponent } from './credits/ajout-demande-credit/ajout-demande-credit.component';
import {AllTemplateBackComponent} from "./back/all-template-back/all-template-back.component";
import {FooterBackComponent} from "./back/footer-back/footer-back.component";
import {HomeBackComponent} from "./back/home-back/home-back.component";
import {NavbarBackComponent} from "./back/navbar-back/navbar-back.component";
import {SidebarBackComponent} from "./back/sidebar-back/sidebar-back.component";
import {FormulaireDemandeCreditComponent} from "./front/formulaire-demande-credit/formulaire-demande-credit.component";
import {StepFourComponent} from "./front/step-four/step-four.component";
import {StepThreeComponent} from "./front/step-three/step-three.component";
import {StepTwoComponent} from "./front/step-two/step-two.component";
import {StepOneComponent} from "./front/step-one/step-one.component";
import {SignatureInputComponent} from "./front/signature-input/signature-input.component";
import {PdfGeneratorService} from "./services/pdf-generator.service";
import {DatePipe} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    HomeFrontComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    HomeBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    SignInComponent,
    LoginComponent,
    SidebarComponent,
    ProfileComponent,
    CreditComponent,
    AceptedCreditComponent,
    EcheanceComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    DetailDemandeEnCoursComponent,
    ClientTableComponent,
    ProfilAdminComponent,
    SecurityAdminComponent,
    SimulateurComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    EcheancesDetailsComponent,
    DemandeCreditComponent,
    DemandeDetailsComponent,
    AjoutDemandeCreditComponent,
    FormulaireDemandeCreditComponent,
    StepFourComponent,
    StepThreeComponent,
    StepTwoComponent,
    StepOneComponent,
    SignatureInputComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,

  ],

  providers: [AuthService, {
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,},PdfGeneratorService,DatePipe],

  bootstrap: [AppComponent]
})
export class AppModule { }

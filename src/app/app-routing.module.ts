import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front/all-template-front/all-template-front.component';
import { HomeFrontComponent } from './front/home-front/home-front.component';
import {LoginComponent} from "./front/login/login.component";
import {SidebarComponent} from "./front/sidebar/sidebar.component";
import {ProfileComponent} from "./front/profile/profile.component";
import {CreditComponent} from "./front/credit/credit.component";
import {AceptedCreditComponent} from "./front/acepted-credit/acepted-credit.component";
import {authGuard, LoggedGuard} from "./services/auth.guard";
import {EcheanceComponent} from "./front/echeance/echeance.component";
import {AdminDashboardComponent} from "./back/admin-dashboard/admin-dashboard.component";
import {adminGuard} from "./services/admin.guard";
import {ClientTableComponent} from "./back/client-table/client-table.component";
import {ProfilAdminComponent} from "./back/profil-admin/profil-admin.component";
import {SecurityAdminComponent} from "./back/security-admin/security-admin.component";
import {SimulateurComponent} from "./front/simulateur/simulateur.component";
import {ForgetPasswordComponent} from "./front/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./front/reset-password/reset-password.component";
import {AjoutDemandeCreditComponent} from "./credits/ajout-demande-credit/ajout-demande-credit.component";
import {DemandeCreditComponent} from "./front/demande-credit/demande-credit.component";
import {FormulaireDemandeCreditComponent} from "./front/formulaire-demande-credit/formulaire-demande-credit.component";


const routes: Routes = [

  { path : "profile",
    component:AllTemplateFrontComponent,
    children:[

      {
        path:"user",
        component:ProfileComponent,
        title: 'myProfile'

      },
      {
        path:"demandeByUser",
        component:DemandeCreditComponent,

      },

      {
        path:"acceptedDemande",
        component:AceptedCreditComponent
      },
      {
        path:"echeance",
        component:EcheanceComponent
      },
      {
        path:"demande",
        component:AjoutDemandeCreditComponent,
      },
    ]},
  {
    path:"",
    component:HomeFrontComponent
  },
  {
    path:"home",
    component:HomeFrontComponent
  },
  {
    path:"simulateur",
    component:SimulateurComponent
  },
  {
    path:'adminDashboard',
    component:AdminDashboardComponent,
    canActivate: [adminGuard],
    title: 'Admin Dashboard'
  },
  {
    path:'profilAdmin',
    component:ProfilAdminComponent,
    title:'Profile Admin'
  },
  {
    path:'clients',
    component:ClientTableComponent,
    title:'Les Clients'
  },
  {
    path:'securityAdmin',
    component:SecurityAdminComponent,
    canActivate:[adminGuard],
    title:'Changer Mot de Passe'
  },
  {
    path:"side",
    component:SidebarComponent
  },
  {
    path:"login",
    component:LoginComponent,
    //canActivate:[authGuard],
    title: 'Inscrivez Vous'
  },
  {
    path: 'ForgetPass',
    component: ForgetPasswordComponent,
    title: 'entrez mail'
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    title: 'Reset Your Password'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

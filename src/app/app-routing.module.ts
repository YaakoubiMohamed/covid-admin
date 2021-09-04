import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterArticleComponent } from './articles/ajouter-article/ajouter-article.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './login/login.component';
import { ModifierArticleComponent } from './articles/modifier-article/modifier-article.component';
import { ContactComponent } from './contact/contact.component';
import { AfficherComponent } from './contact/afficher/afficher.component';
import { PatientComponent } from './patient/patient.component';
import { AfficherArticleComponent } from './articles/afficher-article/afficher-article.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetComponent } from './forget/forget.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'', component:LayoutsComponent,
  children: [
    {path:'home', component: HomeComponent},
    {path:'articles', component: ArticlesComponent},
    {path:'ajouter-articles', component: AjouterArticleComponent},
    {path:'modifier-articles', component: ModifierArticleComponent},
    {path:'afficher-articles', component: AfficherArticleComponent},
    {path:'contact', component: ContactComponent},
    {path:'afficher', component: AfficherComponent},
    {path:'patient', component: PatientComponent},
  ]},
  {path:'login', component: LoginComponent},
  {path:'forget', component: ForgetComponent},
  {path:'reset', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

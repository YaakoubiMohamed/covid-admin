import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { AjouterArticleComponent } from './articles/ajouter-article/ajouter-article.component';
import { ModifierArticleComponent } from './articles/modifier-article/modifier-article.component';
import { ContactComponent } from './contact/contact.component';
import { AfficherComponent } from './contact/afficher/afficher.component';
import { RepondreComponent } from './contact/repondre/repondre.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PatientComponent } from './patient/patient.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfficherArticleComponent } from './articles/afficher-article/afficher-article.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetComponent } from './forget/forget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    AjouterArticleComponent,
    ModifierArticleComponent,
    ContactComponent,
    AfficherComponent,
    RepondreComponent,
    HomeComponent,
    LoginComponent,
    LayoutsComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PatientComponent,
    AfficherArticleComponent,
    ResetPasswordComponent,
    ForgetComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

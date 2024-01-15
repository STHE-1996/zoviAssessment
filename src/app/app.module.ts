import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { VerificationComponent } from './pages/verification/verification.component';
import { LoaderComponent } from './loader/loader.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    VerificationComponent,
    LoaderComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HttpClient, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

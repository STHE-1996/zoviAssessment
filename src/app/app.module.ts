import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { LoaderComponent } from './loader/loader.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

import { UploadService } from './services/profile/upload.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';

import { AuthInterceptor } from './auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { TaskComponent } from './pages/task/task.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoaderComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    ProfileComponent,
    VerificationComponent,
    TaskComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,BrowserAnimationsModule,MatSidenavModule],
  providers: [HttpClient, AuthenticationService,UploadService,  AuthInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { LoaderComponent } from './loader/loader.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TabsComponent } from './pages/tabs/tabs.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'welcome',
    component: WelcomeComponent,
  },

  {
    path: 'verification',
    component: VerificationComponent,
  },

  {
    path: 'loader',
    component: LoaderComponent,
  },

  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },

  {
    path: 'updatePassword',
    component: UpdatePasswordComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },

  {
    path: 'tabs',
    component: TabsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

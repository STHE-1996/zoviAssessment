import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashComponentimplements } from './pages/dash/dash.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { WasteComponent } from './pages/waste/waste.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecyclingLocationComponent } from './pages/recycling-location/recycling-location.component';


const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' } // Redirect root to login
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dash', component: DashComponentimplements },
      { path: 'waste', component: WasteComponent },
      { path: 'profile', component: ProfileComponent },
      {path:'recycling', component: RecyclingLocationComponent},
      { path: '', redirectTo: 'dash', pathMatch: 'full' } // Redirect root to dash within MainLayout
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

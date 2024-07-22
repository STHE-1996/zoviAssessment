import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/register-request';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: LoginRequest = { email: '', password: '' };

  constructor(private authService: AuthenticationService, private router: Router) {}

  loading: boolean = false;

  onSubmit(): void {
    this.loading = true;
    console.log('Submitted credentials:', this.credentials);
  
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
      },
      (error: any) => {
        console.error('Login error', error);
      }
    ).add(() => {
      this.loading = false;
    });
  }
}


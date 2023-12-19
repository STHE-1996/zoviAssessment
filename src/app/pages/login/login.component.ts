import { Component } from '@angular/core';
import { LoginRequest } from 'src/app/models/register-request';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: LoginRequest = { whatsappNumber: '', password: '' };

  constructor(private authService: AuthenticationService) {}

  onSubmit(): void {
    console.log('Submitted credentials:', this.credentials);

    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        // Handle successful login response
        console.log('Login successful', response);
      },
      (error: any) => {
        // Handle login error
        console.error('Login error', error);
      }
    );
  }
}

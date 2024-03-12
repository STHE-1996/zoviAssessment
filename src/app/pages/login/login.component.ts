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
  credentials: LoginRequest = { whatsappNumber: '', password: '' };

  constructor(private authService: AuthenticationService, private router: Router) {}

  loading: boolean = false;

  onSubmit(): void {
    this.loading = true;
    console.log('Submitted credentials:', this.credentials);
  
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        // Handle successful login response
        console.log('Login successful', response);
  
        const userId = response.data;
  
        this.authService.setUserId(userId);
  
        this.router.navigate(['/profile', userId]);
  
        // Consider using a toast or notification service instead of alert
        alert(response.responseMessage);
      },
      (error: any) => {
        // Handle login error
        console.error('Login error', error);
        // Add additional error handling as needed
      }
    ).add(() => {
      this.loading = false; // Set loading to false when the API call is complete
    });
  }
  
}


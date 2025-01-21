import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string;
 

  constructor(private authService: AuthenticationService) {
    this.email = '';
  }

  loading: boolean = false;

  sendOTP() {
    this.loading = true;
    // Assuming you have proper validation for the username and channel
    if (this.email) {
      // Call the service to send OTP
      this.authService.sendOTP(this.email).subscribe(
        (message) => {
          if (message) {
            alert(message);
          }
        },
        (error) => {
          // Handle error, you may display an error message
          console.error('Error sending OTP:', error);
          alert(
            'Error sending OTP: ' +
              (error.message || 'An unexpected error occurred.')
          );
        }
        ).add(() => {
          this.loading = false; // Set loading to false after the transaction
        });
    } else {
      // Handle validation error, show a message to the user
      alert('Please enter a valid username and select a channel.');
      this.loading = false;
    }
  }
}

import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  username: string;
  selectedChannel: string;

  constructor(private authService: AuthenticationService) {
    this.username = '';
    this.selectedChannel = '';
  }

  sendOTP() {
    // Assuming you have proper validation for the username and channel
    if (this.username && this.selectedChannel) {
      // Call the service to send OTP
      this.authService.sendOTP(this.username, this.selectedChannel).subscribe(
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
      );
    } else {
      // Handle validation error, show a message to the user
      alert('Please enter a valid username and select a channel.');
    }
  }
}

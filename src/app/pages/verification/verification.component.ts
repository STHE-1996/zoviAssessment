import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent {
  enteredPin: string[] = ['', '', '', '', ''];
  verificationMessage: string = ''; // Variable to store the verification result

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  verifyAccount(): void {
    const pin = this.enteredPin.join('');

    this.authService.verifyAccount(pin).subscribe(
      (response) => {
        // Handle successful verification response
        alert(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle verification error
        console.error('Verification error', error);

        if (error.error && error.error.message) {
          // A clear error message from the server
          alert('An error occurred: ' + error.error.message);
        } else {
          // Fallback for unexpected errors
          alert('Unexpected error occurred. Please try again.');
        }
      }
    );
  }
}

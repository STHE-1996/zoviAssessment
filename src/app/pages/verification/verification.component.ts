import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  enteredPin: string[] = ['', '', '', '', ''];
  verificationMessage: string = ''; // Variable to store the verification result

  constructor(
    private authService: AuthenticationServiceService,
    private router: Router,
    private appComponent : AppComponent
  ) {}

  verifyAccount(): void {
    const pin = this.enteredPin.join('');

    this.authService.verifyAccount(pin).subscribe(
      (response) => {
        // Handle successful verification response
        alert(response.responseMessage);
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

  // Updated handleInput function for Angular
  handleInput(event: any, index: number): void {
    // Get the value of the current input
    const inputValue = event.target.value;

    // Update the corresponding element in the enteredPin array
    this.enteredPin[index] = inputValue;

    // If the current input has a value, focus on the next input
    if (inputValue.length > 0) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  handlePaste(event: any, index: number): void {
    // Prevent the default paste behavior
    event.preventDefault();

    // Get the pasted text
    const pastedText = event.clipboardData.getData('text');

    // Update the corresponding elements in the enteredPin array
    for (
      let i = 0;
      i < pastedText.length && index + i < this.enteredPin.length;
      i++
    ) {
      this.enteredPin[index + i] = pastedText[i];
    }

    // Focus on the next input
    const nextIndex = index + pastedText.length;
    if (nextIndex < this.enteredPin.length) {
      const nextInput = document.getElementById(`input${nextIndex + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}


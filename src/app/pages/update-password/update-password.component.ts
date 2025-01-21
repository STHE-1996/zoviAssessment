import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  updatePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.updatePasswordForm = this.fb.group({
      email: ['', [Validators.required]],
      otp: this.fb.array(new Array(5).fill(null).map(() => this.fb.control('', [Validators.required]))),
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get otp(): FormArray {
    return this.updatePasswordForm.get('otp') as FormArray;
  }

  handleInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }

  handlePaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text');

    if (pastedText) {
      const otpArray = pastedText.split('').slice(0, 5);

      otpArray.forEach((char, idx) => {
        if (idx < 5) {
          this.otp.at(idx)!.setValue(char); // Use non-null assertion operator
        }
      });

      event.preventDefault();
      const nextInput = document.getElementById(`otp-input-${otpArray.length}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }

  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      const formValue = this.updatePasswordForm.value;
      const request = {
        email: formValue.email,
        otpPin: formValue.otp.join(''),
        newPassword: formValue.newPassword,
        confirmNewPassword: formValue.confirmPassword
      };

      this.authService.updatePassword(request).subscribe(
        response => {
          alert('Password updated successfully');
        },
        error => {
          alert('Failed to update password');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';

import {


  RegisterRequest,
} from 'src/app/models/register-request';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerRequest: RegisterRequest = {};



  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  
  loading: boolean = false;
  passwordFieldType: string = 'password';

  registerUser() {
    this.loading = true;

    this.authService.register(this.registerRequest).subscribe(
      (response) => {
        alert(response.responseMessage);
        this.router.navigate(['/verification']);
      },
      (error) => {
        console.error('Registration error', error);
        if (error.error instanceof ErrorEvent) {
          alert('An error occurred: ' + error.error.message);
        } else {
          alert('Sorry: ' + error.error.message);
        }
      }
    ).add(() => {
      this.loading = false; 
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}


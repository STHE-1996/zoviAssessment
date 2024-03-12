import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoaderComponent } from 'src/app/loader/loader.component';

import {
  ChurchName,
  Province,
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

  availableProvinces: Province[] = [];
  availableChurchNames: ChurchName[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getProvinces().subscribe(
      (provinces) => {
        this.availableProvinces = provinces;
      },
      (error) => {
        console.error('Error fetching provinces', error);
      }
    );

    this.authService.getChurchNames().subscribe(
      (churchNames) => {
        this.availableChurchNames = churchNames;
      },
      (error) => {
        console.error('Error fetching church names', error);
      }
    );
  }

  onChurchNameChange() {
    if (this.registerRequest.churchName !== 'NOT_AVAILABLE') {
      // If a church is selected, disable the enterChurchName field
      this.registerRequest.enterChurchName = ''; // Clear the value
    }
  }
  loading: boolean = false;

  registerUser() {
    this.loading = true; // Set loading to true before making the API call

    this.authService.register(this.registerRequest).subscribe(
      (response) => {
        // Handle successful registration response
        alert(response.responseMessage);
        this.router.navigate(['/verification']);
      },
      (error) => {
        // Handle registration error
        console.error('Registration error', error);

        if (error.error instanceof ErrorEvent) {
          // A client-side error occurred.
          alert('An error occurred: ' + error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          alert('Sorry: ' + error.error.message);
        }
      }
    ).add(() => {
      this.loading = false; // Set loading to false when the API call is complete
    });
  }
}


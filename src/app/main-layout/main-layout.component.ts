import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
localStorage: any;
  constructor(private authService: AuthenticationService) {}
  isWasteManagementStaff(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Management';
  }

  isIndividualAndBusiness(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Marketing' || role === 'IT'|| role === 'HR';
  }
  
  logout(): void {
    this.authService.logout();  // Call the logout method from AuthenticationService
  }
  
}

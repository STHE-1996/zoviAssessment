import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  isWasteManagementStaff(): boolean {
    const role = localStorage.getItem('role');
    return role === 'waste_management_staff';
  }
  
}

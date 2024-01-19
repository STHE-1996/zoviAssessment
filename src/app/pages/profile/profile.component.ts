import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  selectedTab = 'projects-tab'; // Default tab

  selectTab(tabId: string): void {
    this.selectedTab = tabId;
  }
}

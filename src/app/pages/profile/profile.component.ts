import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userId: string | null = null;
  user: any = null;
  constructor(private userService: AuthenticationService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.error('Error fetching user data', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }
}

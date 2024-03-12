import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from 'src/app/models/register-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadService } from 'src/app/services/profile/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId!: string;
  userDetails!: UserDetails;
  users: UserDetails[] = [];
  loader: boolean = true;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private authService: AuthenticationService,
    private userService: AuthenticationService, 
    private  uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];

    // Fetch user details using UserService
    this.userService.getUserDetails(this.userId).subscribe(
      (userDetails: UserDetails) => {
        this.userDetails = userDetails;
        
        const id = this.userId;
        this.userService.getChurchMembers(id).subscribe((data) =>{
          this.users = data;
        })
        this.loader = false;
      },
      (error: any) => {
        console.error('Error fetching user details', error);
        this.loader = false;
      }
    );
  }
  

  // logout(): void {
  //   this.authService.logoutUser(this.userId);
  //   this.router.navigate(['/login']);
  // }

  selectedTab = 'projects-tab'; // Default tab

  selectTab(tabId: string): void {
    this.selectedTab = tabId;
  }

  selectedFile: File | null = null;

  openFileInput() {
    // Trigger the file input click event
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    // Retrieve the selected file
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture() {
    console.log('userDetails:', this.userDetails);
  
    if (this.userDetails && this.selectedFile) {
      this.uploadService.uploadProfilePicture(this.selectedFile, this.userDetails.id)
        .subscribe(response => {
          console.log(response);
          this.loader = false;
        });
    } else {
      console.error('userDetails or selectedFile is null');
      this.loader = false;
    }
  }




  
}
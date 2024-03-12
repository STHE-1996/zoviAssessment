import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posting, postingImage } from 'src/app/models/posting';
import { Post, UserDetails } from 'src/app/models/register-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadService } from 'src/app/services/profile/upload.service';





@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      transition('open <=> closed', animate('0.3s ease-in-out'))
    ])
  ]
})
export class WelcomeComponent implements OnInit{
  [x: string]: any;

  userId!: string;
  userDetails!: UserDetails;

 posts: Post[] = [];
 loader: boolean = true;

 posting: Posting = { id: '', title: '', paragraph: '' };
 postingImage: postingImage = {
   id: '', title: '',
   file: ''
 };
 
 @ViewChild('content') modalContent: any;
 modalContentIsImage: boolean = false;
 modalContentIsVideo: boolean = false;

  constructor(private route: ActivatedRoute,
     private userService: AuthenticationService,
      private uploadService: UploadService) {}

  ngOnInit(): void {
    // Retrieve the userId from the route parameters
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.userService.getUserDetails(this.userId).subscribe(
        (userDetails: UserDetails) => {
          this.userDetails = userDetails;
          this.fetchPosts();
        },
        (error: any) => {
          console.error('Error fetching user details', error);
        }
      );
    });
  }

  fetchPosts(): void {
    console.log('Fetching posts...');
    this.userService.getPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
        this.loader = false;
      },
      (error: any) => {
        console.error('Error fetching posts:', error);
        this.loader =false;
      }
    );
  }
  

  isImage(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  }
  
  isVideo(url: string): boolean {
    const videoExtensions = ['.mp4', '.avi', '.mov']; // Add more video formats if needed
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  }

  onSubmit() {
    // Assuming userId is available in your component
    this.uploadService.postToBackend({
      id: this.userId,
      title: this.posting.title,
      paragraph: this.posting.paragraph
    })
      .subscribe(response => {
        console.log('Post successful', response);
        this.loader = false;
        // Handle the response as needed
      }, error => {
        console.error('Error posting to the backend', error);
        this.loader = false;
        // Handle the error as needed
      });
  }
  
  postingimage = { title: '' };
  selectedFile: File | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmitImage() {
    console.log('User ID:', this.userId);
    console.log('Title:', this.postingimage.title);
    console.log('Selected File:', this.selectedFile);
  
    if (this.selectedFile) {
      this.uploadService.postToBackendImage(this.selectedFile, 'yourPicValue', this.userId, this.postingimage.title)
    .subscribe(response => {
        // Handle success response
        console.log(response);
        this.loader =false;
    }, error => {
        // Handle error
        console.error(error);
        this.loader = false;
    });
  }
}
  
  

  
  activeTab: string = 'posts';
  
  sharedOrSubmitImage() {
    if (this.activeTab === 'posts') {
      this.onSubmit();
    } else if (this.activeTab === 'images') {
      this.onSubmitImage();
    }
  }

  sidebarState = 'closed';

  toggleSidebar() {
    this.sidebarState = (this.sidebarState === 'closed' ? 'open' : 'closed');
  }

  


}

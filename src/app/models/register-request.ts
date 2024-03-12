export interface RegisterRequest {
  firstName?: string;
  secondName?: string;
  email?: string;
  whatsappNumber?: string;
  gender?: string;
  username?: string;
  province?: string;
  zionType?: string;
  churchName?: string;
  enterChurchName?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ChurchName {
  churchName: string;
  id: string;
}

export interface Province {
  code: string;
  id: string;
  province: string;
}

export interface Verification {
  pin?: string;
}

export interface LoginRequest {
  whatsappNumber: string;
  password: string;
}

export interface UserDetails {
  id: string;
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  gender: string;
  churchType: string;
  profilePictureUrl: string | null;
  province: string;
  pin: string;
  churchName: string;
  verificationStatus: string;
  password: string;
  loginStatus: boolean;
  postModelList: PostModel[]; // Assuming PostModel is another interface or type for posts
  weddingModelList: WeddingModelList[]; 
  sentInvitation: WeddingModelList[];
  whatsappNumber: string;
}

interface PostModel {
  title: string | null;
  content: string;
  comments: Comment[] | null; // Assuming Comment is another interface or type for comments
}

interface Comment {
  // Define the structure of a comment if needed
}

export interface Post {
  title: string;
  content: string;
  userId: string;
  localDateTime: Date; // Assuming you're using Date for LocalDateTime
  comments: CommentsModel[]; // Assuming CommentsModel is defined as well
  user: UserDetails;
}


export interface CommentsModel {
  userId: String;
  text: String;
}

export interface WeddingModelList{
     invitationId: string;
     userId: string;
     imageUrl: string;
     videoUrl: string;
     createdDate: Date;
     dateOfWedding: Date;
     caption: string;
     location: string;
     husbandName: string;
     wifeName: string;
     invitationStatus: string;
     ListOfGuests: UserDetails;
}


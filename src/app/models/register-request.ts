export interface RegisterRequest {
  name?: string;
  surname?: string;
  email?: string;
  gender?: string;
  userRole?: string;
  password?: string;
  confirmPassword?: string;
}





export interface Verification {
  pin?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}





interface Comment {
  // Define the structure of a comment if needed
}








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

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  token: string
}

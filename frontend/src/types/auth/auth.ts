export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}
  
export interface AuthState {
    user: User | null;
    token: string | null;
}
  
export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}
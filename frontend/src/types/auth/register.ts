export interface RegisterData{
    username: string;
    email: string;
    password: string;
    role: 'vendor' | 'customer';
}
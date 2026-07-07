export interface UserProfile {
  uid: string;
  name: string;
  phone: string;
  role: "client" | "provider" | "admin";
  city: string;
  profession?: string;
  bio?: string;
  verified: boolean;
}

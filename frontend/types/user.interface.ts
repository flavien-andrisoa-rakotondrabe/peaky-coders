export interface UserInterface {
  id: number;

  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone: string;
  email_verified_at: string;

  created_at: string;
  updated_at: string;
}

export interface UserPublicInterface {
  id: number;

  first_name: string;
  last_name: string;
  avatar: string;
}

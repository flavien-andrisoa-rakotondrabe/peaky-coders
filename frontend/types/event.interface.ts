import { UserPublicInterface } from "@/types/user.interface";

export interface EventInterface {
  id: string;

  title: string;
  type: string;
  date: string;
  description: string;

  image_urls: string[];
  location: { lat: number; lng: number };
  updated_at: string;
  user: UserPublicInterface;
}

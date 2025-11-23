import { JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
  sub: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  university?: string;
  birthDate?: Date;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  category: Category;
  sellerId: number;
  seller: User;
  isSold: boolean;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  senderId: number;
  sender?: User;
  read: boolean;
}

export interface Conversation {
  id: number;
  users: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

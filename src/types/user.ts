export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string; // アバター画像URL
    role: "Admin" | "User" | "Guest";
  }

import { User } from "@prisma/client";

// export type SafeUser = Omit<
//   User,
//  "createdAt" | "updatedAt" | "emailVerified"
//  > & {
//     createdAt: string;
//     updatedAt: string;
//     emailVerified: string | null;
//  } '


export type SafeUser = {
    createdAt: string;
    updatedAt: string; 
    emailVerified: string | null; 
    id: string; 
    name: string | null; 
    email: string; 
    image: string | null; 
    hashedPassword: string | null; 
    favoriteIds: string[];
}
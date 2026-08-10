
export interface AuthUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;

  avatar?: string;
  bio?: string;

  githubLink?: string;

  skills?: string[];

  followers?: string[];
  following?: string[];

  createdAt?: string;
  updatedAt?: string;

  __v?: number;
}
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
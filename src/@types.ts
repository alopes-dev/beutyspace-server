export type UserType = {
    id?:string,
    email?: string;
    password?: string;
    password_hash?: string;
    role?: string;
    avatar?: string;
  };

export type ClientType = {
    id?:string,
    firstName: string;
    lastName : string;
    phone       : string;
    user : UserType;
    userId?:string;
};
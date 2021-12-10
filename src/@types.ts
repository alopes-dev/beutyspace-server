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

export type ProviderType = {
  id?:string,
  name: string;
  address : string;
  contact: string;
  userId:string;
};

export type ServicesType = {
  id?:string,
  name: string;
  imgCode : string;
  hallId: string;
};

export type AppointmentsType = {
  id?:string,
  date: Date ;
  canceledAt : Date ;
  password: string;
  password_hash: string;
  clientId: string;
  providerId: string;
};


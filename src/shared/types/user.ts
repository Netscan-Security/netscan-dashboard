export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contactNumber: string;
  imageUrl: string;
  role: string;
  hasHost: boolean;
};

export type User = {
  user?: UserData;
  access_token: string;
};

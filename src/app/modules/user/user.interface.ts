export type TUser = {
  email: string;
  name: string;
  password: string;
  photo?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  weight?: string;
  hight?: string;
  dateOfBirth?: string;
  contactNo?: string;
};

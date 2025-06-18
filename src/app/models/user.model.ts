export interface User {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  predictedAge?: number;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  occupation: string;
  annualIncome?: number;
  signature: string;
}

export interface PredictedAgeResponse {
  name: string;
  age: number;
  count: number;
}

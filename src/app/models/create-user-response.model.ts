export interface CreateUserResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    conformpassword: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    occupation: string;
    annualIncome: number;
    pdfPath: string;
    signature: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface DoctorEditDTO {
  firstName: string;
  lastName: string;
  userName: string;
  address: string;
  phone: string;
  cardNumber: number;
  age: number;
  worksIn: string;
  history: string;
  price: number;
}

// Default values for DoctorEditDTO
export const defaultDoctorEditDTO: DoctorEditDTO = {
  firstName: '',
  lastName: '',
  userName: '',
  address: '',
  phone: '',
  cardNumber: 0,
  age: 0,
  worksIn: '',
  history: '',
  price: 0
};

export type RegistrationData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export const registrationData: RegistrationData = {
  firstName: 'Anna',
  lastName: 'Kowalska',
  address: 'Marszalkowska 10',
  city: 'Warsaw',
  state: 'Mazowieckie',
  zipCode: '00-001',
  phone: '500123456',
  ssn: '123456789',
  username: 'anna_kowalska',
  password: 'Password123!',
  confirmPassword: 'Password123!',
};
export interface BillPaymentData {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    account: string;
    verifyAccount: string;
    amount: string;
}

export const billPaymentData = {
    payeeName: 'John',
    address: 'Ostrzycka',
    city: 'Warsaw',
    state: 'PL',
    zipCode: '12345',
    phone: '555-1234',
    account: '123456789',
    verifyAccount: '123456789',
    amount: '100.00'
};
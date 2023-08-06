export type Customer = {
  id: string;
  fullName: string;
  email: string;
  bio: string;
  image: string;
  accountCreated: Date;
  accountName: string;
  phone: string;
  address: string;
};

export type Transaction = {
  id: string;
  customerId: Customer["id"];
  creditCardDetails: {
    cvv: string;
    issuer: string;
    number: string;
  };
  productDetails: {
    price: string;
    productName: string;
    productAdjective: string;
    productMaterial: string;
    product: string;
    department: string;
    productDescription: string;
  };
};

export type CustomerTransaction = {
  customer: Customer;
  transactions: Transaction[];
};

export type GenerateMockCustomers = (
  numCustomers?: number,
  transactionLimit?: number
) => CustomerTransaction[];

export type GenerateRandomCustomer = () => Customer;

export type GenerateRandomTransaction = (customerId: string) => Transaction;

export type WriteCustomersToFile = (
  numCustomers: number,
  randTransactionLimit: number
) => void;

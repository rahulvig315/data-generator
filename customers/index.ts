import { faker } from "@faker-js/faker";
import * as fs from "fs";
import {
  Customer,
  CustomerTransaction,
  GenerateMockCustomers,
  GenerateRandomCustomer,
  GenerateRandomTransaction,
  Transaction,
  WriteCustomersToFile,
} from "./types";

export const generateMockCustomers: GenerateMockCustomers = (
  numCustomers = 10,
  transactionLimit = 30
): CustomerTransaction[] => {
  return Array.from({ length: numCustomers }, (_, i) => i).map((customerI) => {
    let customer = generateRandomCustomer();
    let numTransactions = Math.floor(Math.random() * 100) % transactionLimit;
    let transactions = Array.from({ length: numTransactions }).map((_) =>
      generateRandomTransaction(customer.id as string)
    );
    return {
      customer,
      transactions,
    } as CustomerTransaction;
  });
};

export const generateRandomCustomer: GenerateRandomCustomer = (): Customer =>
  ({
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
    image: faker.image.avatar(),
    accountCreated: faker.date.anytime(),
    accountName: faker.finance.accountName(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
  } as Customer);

export const generateRandomTransaction: GenerateRandomTransaction = (
  customerId: string = faker.string.uuid()
): Transaction => ({
  id: faker.string.uuid(),
  customerId: customerId,
  creditCardDetails: {
    cvv: faker.finance.creditCardCVV(),
    issuer: faker.finance.creditCardIssuer(),
    number: faker.finance.creditCardNumber(),
  } as Transaction["creditCardDetails"],
  productDetails: {
    ...Object.entries(faker.commerce).reduce(
      (details, [key, value]: [string, string]) => {
        if (key !== "faker") {
          return {
            ...details,
          };
        }
      },
      {}
    ),
  } as Transaction["productDetails"],
});

export const writeCustomersToFile: WriteCustomersToFile = (
  numCustomers,
  randTransactionLimit
) => {
  fs.writeFile(
    "customers/examples/results.json",
    JSON.stringify(
      generateMockCustomers(numCustomers, randTransactionLimit)
    ) as any,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
};

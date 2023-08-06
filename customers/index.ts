import { faker } from "@faker-js/faker";
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';

import * as fs from "fs";

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email();

const generateMockCustomers = (numCustomers = 10, transactionLimit = 30) => {
  return Array.from({ length: numCustomers }, (_, i) => i).map((customerI) => {
    let customer = generateRandomCustomer();
    let numTransactions = Math.floor(Math.random() * 100) % transactionLimit;
    let transactions = Array.from({ length: numTransactions }).map((_) =>
      generateRandomTransaction(customer.id)
    );
    return {
      customer,
      transactions,
    };
  });
};

const generateRandomCustomer = () => ({
  id: faker.string.uuid(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  bio: faker.person.bio(),
  image: faker.image.avatar(),
  accountCreated: faker.date.anytime(),
  accountName: faker.finance.accountName(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
});

const generateRandomTransaction = (userId) => ({
  id: faker.string.uuid(),
  userId: userId,
  creditCardDetails: {
    cvv: faker.finance.creditCardCVV(),
    issuer: faker.finance.creditCardIssuer(),
    number: faker.finance.creditCardNumber(),
  },
  productDetails: {
    ...Object.entries(faker.commerce).reduce((details, [key, value]) => {
      if (key !== "faker") {
        return {
          ...details,
          [key]: value(),
        };
      }
    }, {}), //=
  },
});

fs.appendFile(
  "results.json",
  JSON.stringify(generateMockCustomers()) as any,
  function (err) {
    if (err) throw err;
    console.log("Saved!");
  }
);

// contacts.js

// const { rejects } = require("assert");
// const { error } = require("console");
const fs = require("fs");
// const { resolve } = require("path");
const path = require("path");

//  Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    } else {
      const contacts = JSON.parse(data);
      console.table(contacts);
      return contacts;
    }
  });
}
// listContacts();

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }
    const contacts = JSON.parse(data);

    const contactById = contacts.find((contact) => {
      if (contact.id === contactId) {
        console.log(`getContactById: ${contactId}`);
        console.table(contact);
        return contact;
      }
      if (contact !== contactId) {
        return;
      }
    });
  });
}

// getContactById();

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    console.log(`Contact with ID: ${contactId} was removed`);
    console.table(filteredContacts);

    if (contacts.length === filteredContacts.length) {
      return;
    }

    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), (error) => {
      return console.log(error);
    });
  });
}

removeContact();

function addContact(name, email, phone) {
  // ...твой код

  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    if (
      contacts.filter(
        (contact) =>
          contact.name === name &&
          contact.email === email &&
          contact.phone === phone
      ).length === 0
    ) {
      contacts.push({
        name: name,
        email: email,
        phone: phone,
        id: contacts.length + 1,
      });

      console.log("Contact added");
      console.table(contacts);

      fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
        if (error) {
          return console.log(error);
        }
      });
    }
  });
}

// addContact();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

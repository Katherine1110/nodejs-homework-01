const contactsList = require("./contacts");

// index.js
const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsList.listContacts();
      break;

    case "get":
      contactsList.getContactById(id);
      break;

    case "add":
      contactsList.addContact(name, email, phone);
      break;

    case "remove":
      contactsList.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

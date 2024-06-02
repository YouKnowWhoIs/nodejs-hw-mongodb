import { ContactsCollection } from '../db/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getOneContacts = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

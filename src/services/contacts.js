import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getOneContacts = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updatetContacts = async (id, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const deleteContacts = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
};

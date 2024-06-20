import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/contact.js';
import { calculatePaginationData } from '../utils/caculatePaginationData.js';
import { SORT_ORDER } from '../contacts/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = ContactsCollection.find();

  if (filter.contactType) {
    studentsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    studentsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const studentsCount = await ContactsCollection.find()
    .merge(studentsQuery)
    .countDocuments();

  const contacts = await studentsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  return { data: contacts, ...paginationData };
};

export const getOneContacts = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContacts = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updatedContacts = async (id, payload) => {
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

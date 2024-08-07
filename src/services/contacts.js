import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/caculatePaginationData.js';
import { SORT_ORDER } from '../contacts/index.js';
import { saveFile } from '../utils/saveFile.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
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

  studentsQuery.where('userId').equals(userId);

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
  // const contact = await ContactsCollection.findById({ _id: contactId, userId });
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContacts = async ({ photo, ...payload }, userId) => {
  let url;

  if (photo) {
    url = await saveFile(photo);
  }

  const contact = await ContactsCollection.create({
    ...payload,
    userId: userId,
    photo: url,
  });
  return contact;
};

export const updatedContacts = async (contactId, payload, options = {}) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!contact || !contact.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return {
    contact: contact.value,
    isNew: Boolean(contact?.lastErrorObject?.upserted),
  };
};

export const deleteContacts = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

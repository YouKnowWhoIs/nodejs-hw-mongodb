import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {
  getAllContacts,
  getOneContacts,
  createContacts,
  deleteContacts,
  updatedContacts,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContctsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContctsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({
      data: 'ID not found',
    });
  }

  const contact = await getOneContacts(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = await createContacts(req.body, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfuly create contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updatedContacts(contactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfuly update contact!',
    data: result,
  });
};

export const deleteContactsController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContacts(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

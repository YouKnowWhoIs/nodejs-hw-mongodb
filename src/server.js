import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getOneContacts } from './services/contacts.js';
import mongoose from 'mongoose';

export const setupServer = () => {
  const PORT = 3000;

  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      next(err);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(404).json({
        data: 'ID not found',
      });
    }

    try {
      const contact = await getOneContacts(contactId);
      if (!contact) {
        return res.status(404).json({
          message: `Contact with id ${contactId} not found!`,
        });
      }
      res.status(200).json({
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(404).json({
        data: 'ID not found',
      });
    }
    const contact = await getOneContacts(contactId);
    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next();
  });

  app.use((err, req, res) => {
    console.log(err.stack);
    res.status(500).json({
      message: 'Server Error',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

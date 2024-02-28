import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  console.log(_id);

  const { page = 1, limit = 20, favorite } = req.query;
  const isFavorite = favorite === "true";

  const contactsList = await listContacts(_id, page, limit, isFavorite);
  res.json(contactsList);
};

export const getOneContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const id = req.params.id;
    const contact = await getContactById(id, _id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (er) {
    next(er);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const id = req.params.id;
    const deleteContact = await removeContact(id, _id);
    if (!deleteContact) {
      throw HttpError(404, "Not found");
    }
    res.json(deleteContact);
  } catch (er) {
    next(er);
  }
};

export const createContact = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;
  const newContact = await addContact(body, _id);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const body = req.body;
    const id = req.params.id;
    if (Object.keys(body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const update = await editContact(id, body, _id);
    if (!update) {
      throw HttpError(404, "Not found");
    }
    res.json(update);
  } catch (er) {
    next(er);
  }
};

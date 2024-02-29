import Contact from "../db/models/contactModel.js";

export async function listContacts(owner, page, limit, isFavorite) {
  try {
    const skip = (page - 1) * limit;
    const query = isFavorite ? { owner, favorite: true } : { owner };

    const contactsList = await Contact.find(query).skip(skip).limit(limit);
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getContactById(contactId, owner) {
  try {
    const result = await Contact.findById(contactId)
      .where("owner")
      .equals(owner);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function removeContact(contactId, owner) {
  try {
    const result = await Contact.findByIdAndDelete(contactId)
      .where("owner")
      .equals(owner);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function addContact(data, owner) {
  try {
    const newContact = await Contact.create({ ...data, owner });
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}
export async function editContact(id, data, owner) {
  try {
    const result = await Contact.findByIdAndUpdate(id, data, { new: true })
      .where("owner")
      .equals(owner);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

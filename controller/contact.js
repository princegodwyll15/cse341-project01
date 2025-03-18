const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("contacts")
    .findOne({ _id: contactId });
  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday
  };

  try {
    const db = mongodb.getDatabase();
    const response = await db.collection("contacts").insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the contact.");
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday 
  };

  try {
    const db = mongodb.getDatabase();
    const response = await db.collection("contacts").replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the contact.");
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  try {
    const db = mongodb.getDatabase();
    const response = await db.collection("contacts").deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "Contact not found" }); 
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
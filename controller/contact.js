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

module.exports = {
  getAll,
  getSingle,
};

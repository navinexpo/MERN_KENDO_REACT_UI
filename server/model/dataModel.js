const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  country: String,
  population: String,
});

const dataModel = mongoose.model("Userdata", dataSchema);

const findAll = async () => {
  try {
    const allDocuments = await dataModel.find();
    console.log(allDocuments);
    return allDocuments;
  } catch (error) {
    console.error("Error in findAll:", error);
    throw error;
  }
};

module.exports = {
  dataModel,
  findAll,
};

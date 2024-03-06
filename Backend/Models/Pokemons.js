const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  "Pokemon_Name": String,
  "Pokemon_Type": String,
  "Region": String,
});

const Pokemondata = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemondata;

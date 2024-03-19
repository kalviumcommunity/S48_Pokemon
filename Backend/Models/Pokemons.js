// const mongoose = require('mongoose');

// const pokemonSchema = new mongoose.Schema({
//   "Pokemon_Name": String,
//   "Pokemon_Type": String,
//   "Region": String,
// });

// const Pokemondata = mongoose.model('pokemon', pokemonSchema);

// module.exports = Pokemondata;

const mongoose = require('mongoose');
const Joi = require('joi');

// Define Joi validation schema for Pokemon data
const pokemonSchemaJoi = Joi.object({
    Pokemon_Name: Joi.string().required(),
    Pokemon_Type: Joi.string().required(),
    Region: Joi.string().required()
});

// Mongoose schema for Pokemon data
const pokemonSchema = new mongoose.Schema({
    Pokemon_Name: {
        type: String,
        required: true
    },
    Pokemon_Type: {
        type: String,
        required: true
    },
    Region: {
        type: String,
        required: true
    }
});

const Pokemondata = mongoose.model('pokemon', pokemonSchema);

module.exports = { Pokemondata, pokemonSchemaJoi };

const mongoose = require('mongoose');
const { mongodb } = require('../config/config');


mongoose.connect(mongodb.URI, { useNewUrlParser: true })
    .then(db => console.log('Conectado con la base de datos'))
    .catch(err => console.error(err))

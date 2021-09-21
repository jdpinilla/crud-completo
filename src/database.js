const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db-app', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(db => console.log('Db is connected'))
.catch(err => console.error(err));
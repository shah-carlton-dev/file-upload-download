const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mac-carlton:test123@cluster0.fjouk.mongodb.net/file_upload?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true}, (err) => {
    console.log('connection in progress');
    if (err) throw err;
    else console.log('mongodb connection successful');
});
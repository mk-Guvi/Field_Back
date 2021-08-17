const mongoose = require('mongoose')
require('dotenv').config()
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //this keeps db connection alive
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB CONNECTED')
  })
  .catch((e) => {
    console.error('DB CONNECTION ERROR: \n\n', e)
  })

// const db = mongoose.connection
// db.on(
//   'error',

//   console.error.bind(console, 'connection error:'),
// )
// db.once('open', function () {
//   // we're connected!
//   console.log('DB CONNECTED')
// })

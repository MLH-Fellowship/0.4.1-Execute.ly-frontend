// import mongoose from 'mongoose';
import app from './app';

// import environment variables
require('dotenv').config({ path: '.env' });

// connect to the database
// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// mongoose.connection.on('error', err => {
//   console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });

// start the app

app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running at ➡ http://localhost:${server.address().port} `);
});

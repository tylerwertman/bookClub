const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors')
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./server/config/mongoose.config');

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);
require('./server/routes/book.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));


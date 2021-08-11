const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/admin.routes');
const clients = require('./routes/client.routes');
const services = require('./routes/service.routes');

const port = 5000;
//middleware
app.use(cors());
app.use(express.json());

app.use('/admin', auth);
app.use('/', clients);
app.use('/', services);

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});

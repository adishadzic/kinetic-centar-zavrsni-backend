const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const auth = require('./routes/admin.routes');
const clients = require('./routes/client.routes');
const services = require('./routes/service.routes');

const { corsConfig } = require('./config/corsConfig');

const port = 5000;

app.use(cors(corsConfig));
app.use(morgan('combined'));
app.use(express.json());

app.get('/admin', auth);

app.post('/clients', clients.addNewClient);
app.get('/clients', clients.getAllClients);
app.get('/client/:id', clients.getClientById);
app.put('/client/:id', clients.updateClientInfo);
app.delete('/client/:id', clients.removeClient);
app.get('/clients/search', clients.clientSearch);

app.post('/services', services.addNewService);
app.get('/services', services.getAllServices);
app.get('/service/:id', services.getServiceById);
app.put('/service/:id', services.updateService);
app.delete('/service/:id', services.removeService);

app.listen(port, () => {
  console.log(`🚀 Server running on port: http://localhost:${port}`);
});

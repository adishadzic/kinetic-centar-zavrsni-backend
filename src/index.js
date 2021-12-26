const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const auth = require("./routes/adminAuth");
const clients = require("./routes/clients");
const services = require("./routes/services");
const reservations = require("./routes/reservations");

const { corsConfig } = require("./config/corsConfig");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/admin", auth);

app.get("/hello", (req, res) => {
  res.send("Gel sadslo");
});

app.post("/clients", clients.addNewClient);
app.get("/clients", clients.getAllClients);
app.get("/clients/:id", clients.getClientById);
app.put("/clients/:id", clients.updateClientInfo);
app.delete("/clients/:id", clients.removeClient);
app.get("/clients-search", clients.clientSearch);

app.post("/services", services.addNewService);
app.get("/services", services.getAllServices);
app.get("/service/:id", services.getServiceById);
app.put("/service/:id", services.updateService);
app.delete("/service/:id", services.removeService);

app.post("/reservations", reservations.addNewReservation);
app.get("/reservations", reservations.getAllReservations);
app.get("/reservations/:id", reservations.getReservationById);
app.put("/reservations/:id", reservations.updateReservation);
app.delete("/reservations/:id", reservations.removeReservation);

app.listen(port, () => {
  console.log(`🚀 Server running on port: http://localhost:${port}`);
});

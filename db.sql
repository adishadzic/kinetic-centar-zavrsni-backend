CREATE DATABASE kinetic_centar;

CREATE TABLE admin(
    admin_id SERIAL PRIMARY KEY,
    admin_first_name VARCHAR(255) NOT NULL,
    admin_last_name VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    admin_password VARCHAR(255) NOT NULL
);

CREATE TABLE client(
    client_id SERIAL PRIMARY KEY,
    client_first_name VARCHAR(255) NOT NULL,
    client_last_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) UNIQUE NOT NULL,
    client_phone_number VARCHAR(15) NOT NULL,
    client_birth_date DATE NOT NULL,
    client_sex CHAR(1) NOT NULL
);

CREATE TABLE service(
    service_id INT PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_description VARCHAR(255) NOT NULL,
    service_duration INT NOT NULL,
    service_price DECIMAL NOT NULL
);

CREATE TABLE reservation(
    reservation_id SERIAL,
    reservation_date TSRANGE UNIQUE NOT NULL,
    reservation_name VARCHAR(30),
    serviceID INT,
    clientID INT,
    PRIMARY KEY(reservation_id),
    FOREIGN KEY(serviceID) REFERENCES service(service_id),
    FOREIGN KEY(clientID) REFERENCES client(client_id)
);
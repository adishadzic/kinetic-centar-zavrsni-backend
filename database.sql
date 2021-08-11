CREATE DATABASE kinetic;

CREATE TABLE admin(
    admin_id SERIAL PRIMARY KEY,
    admin_first_name VARCHAR(255) NOT NULL,
    admin_last_name VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    admin_password VARCHAR(255) NOT NULL,
    admin_profile_picture BYTEA
);

CREATE TABLE client(
    client_id SERIAL PRIMARY KEY,
    client_first_name VARCHAR(255) NOT NULL,
    client_last_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_age INT NOT NULL,
    client_profile_picture BYTEA,
    client_phone_number VARCHAR(15) NOT NULL,
    client_birth_date VARCHAR(10) NOT NULL,
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
    reservation_id INTEGER PRIMARY KEY,
    reservation_date DATE NOT NULL,
    reservation_name VARCHAR(30),
    service_id INT,
    CONSTRAINT fk_service_id FOREIGN KEY(service_id) REFERENCES Service(service_id)
);
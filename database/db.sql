CREATE DATABASE database_links;

USE database_users;

CREATE TABLE users(
    id INT(11) NOT NULL,
    name  VARCHAR(32) NOT NULL,
    lastname VARCHAR(32) NOT NULL,
    password VARCHAR(16) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    phone INT(11) UNIQUE NOT NULL,
    identify INT(11) UNIQUE NOT NULL
);

ALTER TABLE users
ADD PRIMARY KEY (id);

ALTER TABLE users
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


DESCRIBE users;

CREATE TABLE publication(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT(11),
    price DECIMAL(30,2),
    ubication VARCHAR(50),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE publication
ADD PRIMARY KEY (id);

ALTER TABLE publication
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE publication;

CREATE TABLE shopping(
    id INT(11) NOT NULL,
    user_id INT(11),
    publication_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (user_id) REFERENCES publication(id)
);


ALTER TABLE shopping
ADD PRIMARY KEY (id);

ALTER TABLE shopping
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE buy;

CREATE TABLE sales(
    id INT(11) NOT NULL,
    user_id INT(11),
    publication_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (publication_id) REFERENCES publication(id)
);


ALTER TABLE sales
ADD PRIMARY KEY (id);

ALTER TABLE sales
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE sendd;

CREATE TABLE transactionp(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT(11),
    price DECIMAL(30,2),
    ubication VARCHAR(50),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE transactionp
ADD PRIMARY KEY (id);

ALTER TABLE transactionp
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE `sales` ADD `img` VARCHAR(150) NOT NULL AFTER `created_at`, ADD `title` VARCHAR(150) NOT NULL AFTER `img`, 
ADD `description` TEXT NOT NULL AFTER `title`, ADD `price` DECIMAL(30,2) NOT NULL AFTER `description`;


create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contact varchar(20),
    email varchar(50),
    passworrd varchar(250),
    status varchar(250),
    role varchar(20),
    UNIQUE (email)
)

insert into user(name,contact,email,passworrd,status,role) values ('Admin','7507021772','admin@gmail.com','Admin@123','true','Admin');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);
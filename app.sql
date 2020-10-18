CREATE DATABASE employeed_db; 

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  Department_Name VARCHAR(100) DEFAULT '' NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(40),
    salary DECIMAL default 0,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id VARCHAR(30),
    manager_id VARCHAR(30) DEFAULT '' NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO department(Department_Name)
VALUES
("Manager"),
("Sales Person"),
("Accounting"),
("Service representative");

INSERT INTO role(title, salary, department_id)
VALUES
("Manager", 300000, 0),
("Sales", 200000, 1),
("Accounting", 100000, 2),
("Service representativet", 60000, 3);
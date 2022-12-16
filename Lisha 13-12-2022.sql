show databases;
CREATE DATABASE lisha_vshesh;
use lisha_vshesh;
CREATE TABLE employees(
	id int NOT NULL AUTO_INCREMENT, 
	name varchar(255),
    age int,
    location varchar(255),
    email varchar(255) UNIQUE,
    phone_no bigint,
    PRIMARY KEY(id)
);
-- show tables;
-- drop table employees;
-- truncate table employees;-- 

insert into employees (name,age,location,email,phone_no) 
	values ('Lisha Jonwal',24,'Jaipur, Rajasthan','abc@test.com',7677898765),
		('Deepa Thapa',23,'Jaipur, Rajasthan','xyz@test.com',8838387651),
		('Varsha Varshistha',23,'Mohali, Punjab','def@test.com',776990679),
		('Isha Jonwal',24,'Jaipur, Rajasthan','ishajonwal@test.com',7677863545),
		('Mohit Kataria',22,'Jaipur, Rajasthan','mohitkataria@test.com',7674829765);
    
select * from employees;
-- select name from employees;

UPDATE employees SET phone_no=8909900000, email='lishajonwal@gmail.com' WHERE id=1;

ALTER TABLE employees ADD blood_group varchar(20);
-- ALTER TABLE employees drop blood_group;
ALTER TABLE employees ALTER blood_group SET DEFAULT 'not provided';


UPDATE employees SET blood_group='A+ve' WHERE id=1;
select * from employees;




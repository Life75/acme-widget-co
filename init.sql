

CREATE DATABASE Customer;

DECLARE @guid uniqueidentifier = NEWID();
SELECT @guid as 'GUID';		

CREATE TABLE tb_customer
(

Firstname varchar(50),
Lastname varchar(50),
Description varchar(50),
address_line_1 varchar(50),
address_line_2 varchar(50),
City varchar(50),
State varchar(50),
Zip varchar(50),
Business_Type varchar(50),
ID uniqueidentifier default newid()
)		


CREATE TABLE tb_contacts
(
Firstname varchar(50),
Lastname varchar(50),
Phone_number varchar(50),
Email_address varchar(50),
customerID varchar(50)
)


SELECT * FROM tb_customer;
SELECT * FROM tb_contacts;

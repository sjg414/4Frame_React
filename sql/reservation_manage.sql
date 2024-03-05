create table reservation_manage(
userName varchar(20),
userNumber varchar(20) primary key,
phoneNumber varchar(20),
day varchar(10),
room varchar(5),
time varchar(5),
purpose varchar(50),
status varchar(5) default null,
reason varchar(50) default null
);
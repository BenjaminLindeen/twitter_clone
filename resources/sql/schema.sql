create table tweet
(
    date    DATETIME not null,
    message text     not null,
    likes   INT      not null,
    id      INT AUTO_INCREMENT PRIMARY KEY
);

create table user
(
    username varchar(255) not null,
    password varchar(255) not null,
    id       INT AUTO_INCREMENT PRIMARY KEY
);
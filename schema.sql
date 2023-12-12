create table tweet
(
    message text    not null,
    date    DATETIME    not null,
    id      INT AUTO_INCREMENT PRIMARY KEY
);

create table user
(
    username    varchar(255)    not null,
    password    varchar(255)    not null,
    id          INT AUTO_INCREMENT PRIMARY KEY
);
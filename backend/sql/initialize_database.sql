create table stocks
(
    ID          int auto_increment
        primary key,
    LABEL       varchar(255) not null,
    DESCRIPTION varchar(255) null
);

create table items
(
    ID          int auto_increment
        primary key,
    LABEL       varchar(255) null,
    DESCRIPTION varchar(255) null,
    QUANTITY    int          null,
    STOCK_ID    int          null,
    constraint items_ibfk_1
        foreign key (STOCK_ID) references stocks (ID)
);

create index STOCK_ID
    on items (STOCK_ID);

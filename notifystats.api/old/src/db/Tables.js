const { Pool, Client } = require('pg');

const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD
});

let query_channel =  {text: `create unlogged table if not exists channel 
(
    channel_id  integer not null
        constraint channel_pk
            primary key,
    username    varchar(255),
    displayname varchar(255),
    bio         text,
    tagline     varchar(255),
    link        varchar(255),
    location    varchar(255),
    topics      varchar(255),
    verified    boolean default false,
    badges      varchar(255),
    dummy       boolean default false,
    created_at  varchar(255),
    creator     boolean default false,
    gender      varchar(255),
    aliases     varchar(255),
    avatar      varchar(255),
    coverphoto  varchar(255)
);`};


let query_channels = {text: `create unlogged table if not exists channels
(
    channel_id integer not null
        constraint channels_pk
            primary key,
    added_at   bigint
);` };

let query_tracks = {text: `create unlogged table if not exists track
(
    channel_id bigint not null,
    subs       bigint,
    posts      bigint,
    month      varchar(255),
    created_at varchar(255)
);`};

let query_authorisation = { text: `create unlogged table if not exists authorisation
(
    key         uuid 		not null,
    created_at  bigint,
    expire_date bigint
);`};

let query_logs = { text: `create unlogged table if not exists logs
(
    uuid         uuid     not null
        constraint logs_pk
            primary key,
    created_at   bigint   not null,
    code         smallint not null,
    description  varchar(1000),
    performed_by uuid
);`};



function run() {
	pool.query(query_channel);
	pool.query(query_channels);
	pool.query(query_tracks);
	pool.query(query_authorisation);
	pool.query(query_logs);
}


run();
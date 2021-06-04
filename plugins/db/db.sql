DROP SCHEMA IF EXISTS sch_todo CASCADE;

CREATE SCHEMA sch_todo AUTHORIZATION postgres;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

DROP TABLE IF EXISTS sch_todo.todo_list CASCADE;

-- Create TODO list table
CREATE TABLE sch_todo.todo_list
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(96) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT todo_list_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE sch_todo.todo_list OWNER to postgres;

DROP TABLE IF EXISTS sch_todo.todo_items CASCADE;
-- Create TODO items table
CREATE TABLE sch_todo.todo_items
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    list_id uuid NOT NULL,
    description character(256) COLLATE pg_catalog."default",
    checked boolean DEFAULT false,
    CONSTRAINT todo_items_pkey PRIMARY KEY (id),
    CONSTRAINT fk_list_id FOREIGN KEY (list_id)
        REFERENCES sch_todo.todo_list (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE CASCADE
) TABLESPACE pg_default;

ALTER TABLE sch_todo.todo_items OWNER to postgres;
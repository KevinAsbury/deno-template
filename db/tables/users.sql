-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    email character varying COLLATE pg_catalog."default",
    password_digest character varying COLLATE pg_catalog."default" NOT NULL,
    confirmed character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'f'::character varying,
    active character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 't'::character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
-- Index: unique_emails

-- DROP INDEX IF EXISTS public.unique_emails;

CREATE UNIQUE INDEX IF NOT EXISTS unique_emails
    ON public.users USING btree
    (email COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
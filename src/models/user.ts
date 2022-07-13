import User from '../interfaces/User.ts';
import { Client, ClientOptions } from '../../deps.ts';
import config from '../../config/db.config.ts';
import randomString from '../utils/randomString.ts';

const client = new Client(config as ClientOptions);

const all = async (limit = 0) => {
  await client.connect();
  let query = 'SELECT * FROM public.users;';

  if (limit > 0) query = `SELECT * FROM public.users LIMIT ${limit};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result;
};

const create = async (user: User) => {
  await client.connect();
  const query = `
    INSERT INTO 
    public.users(
      email, 
      password_digest, 
      confirmed, 
      active, 
      created_at, 
      updated_at
    ) 
    VALUES(
      ${user.email},
      ${user.password},
      ${user.confirmed},
      ${user.active},
      ${user.createdAt},
      ${user.updatedAt}
    );`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const save = async (user: User) => {
  await client.connect();
  user.updatedAt = new Date();

  const query = `
    UPDATE public.users
	  SET
      email=${user.email},
      password_digest=${user.passwordDigest},
      confirmed=${user.confirmed},
      active=${user.active},
      created_at=${user.createdAt},
      updated_at=${user.updatedAt}
	  WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const destroy = async (user: User): Promise<void> => {
  await client.connect();
  const query = `DELETE FROM public.users WHERE id=${user.id};`;

  let { rows: result } = await client.queryObject<User>({
    text: query,
  });

  await client.end();

  if (result.length > 0) {
    user.id = undefined;
    user.email = '';
    user.active = false;
    user.confirmed = false;
    user.createdAt = 0;
    user.updatedAt = 0;
    user.password = undefined;
    user.passwordConfirmation = undefined;
    user.passwordDigest = undefined;
    result = [];
  }
};

const findByEmail = async (user: User) => {
  await client.connect();
  const query = `SELECT * FROM public.users WHERE email=${user.email};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const findById = async (user: User) => {
  await client.connect();
  const query = `SELECT * FROM public.users WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const activate = async (user: User) => {
  await client.connect();
  user.updatedAt = new Date();
  user.active = true;

  const query = `
    UPDATE public.users
	  SET
      active=${user.active},
      updated_at=${user.updatedAt}
	  WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const deactivate = async (user: User) => {
  await client.connect();
  user.updatedAt = new Date();
  user.active = false;
  user.passwordDigest = randomString(60);

  const query = `
    UPDATE public.users
	  SET
      active=${user.confirmed},
      password_digest=${user.passwordDigest},
      updated_at=${user.updatedAt}
	  WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const confirm = async (user: User) => {
  await client.connect();
  user.updatedAt = new Date();
  user.confirmed = true;

  const query = `
    UPDATE public.users
	  SET
      confirmed=${user.confirmed},
      updated_at=${user.updatedAt}
	  WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const changePassword = async (user: User) => {
  await client.connect();
  user.updatedAt = new Date();
  user.confirmed = false;

  const query = `
    UPDATE public.users
	  SET
      password_digest=${user.passwordDigest},
      confirmed=${user.confirmed},
      updated_at=${user.updatedAt}
	  WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0];
};

const isActive = async (user: User) => {
  await client.connect();
  const query = `SELECT active FROM public.users WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0].active ? true : false;
};

const isConfirmed = async (user: User) => {
  await client.connect();
  const query = `SELECT confirmed FROM public.users WHERE id=${user.id};`;

  const { rows: result } = await client.queryObject<User>({
    camelcase: true,
    text: query,
  });

  await client.end();
  return result[0].confirmed ? true : false;
};

export default {
  all,
  create,
  save,
  destroy,
  findByEmail,
  findById,
  activate,
  deactivate,
  confirm,
  changePassword,
  isActive,
  isConfirmed,
};

import { Client, ClientOptions } from '../deps.ts';
import config from '../config/db.config.ts';

type args = [] | Record<string, unknown> | undefined;
const client = new Client(config as ClientOptions);

const queryObject = async (rawSql: string, args: args = undefined) => {
  await client.connect();
  const object_result = await client.queryObject(rawSql, args);
  console.log(object_result.rows);
  await client.end();
};

const queryArray = async (rawSql: string, args: args = undefined) => {
  await client.connect();
  const array_result = await client.queryArray(rawSql, args);
  console.log(array_result.rows);
  await client.end();
};

export { queryArray, queryObject };

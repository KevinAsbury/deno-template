import { Client, ClientOptions } from '../deps.ts';
import config from '../config/db.config.ts';

const client = new Client(config as ClientOptions);

const queryObject = async (rawSql: string) => {
  await client.connect();
  const object_result = await client.queryObject(rawSql);
  console.log(object_result.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'John'}, ...]
  await client.end();
};

const queryArray = async (rawSql: string) => {
  await client.connect();
  const array_result = await client.queryArray(rawSql);
  console.log(array_result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
  await client.end();
};

export { queryArray, queryObject };

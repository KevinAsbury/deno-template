import { Client } from '../deps.ts';
import env from '../../config/db.config.json' assert { type: 'json' };

const client = new Client({
  user: env.database.user,
  database: env.database.name,
  hostname: env.database.host,
  port: env.database.port,
});

await client.connect();

const array_result = await client.queryArray('SELECT ID, NAME FROM PEOPLE');
console.log(array_result.rows); // [[1, 'Carlos'], [2, 'John'], ...]

const object_result = await client.queryObject('SELECT ID, NAME FROM PEOPLE');
console.log(object_result.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'John'}, ...]

await client.end();

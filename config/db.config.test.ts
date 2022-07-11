export default {
  connection: {
    attempts: 2,
  },
  database: 'core_test',
  hostname: '0.0.0.0',
  host_type: 'tcp',
  password: 'postgrespw',
  options: {
    max_index_keys: '32',
  },
  port: 5432,
  user: 'postgres',
  tls: {
    enforce: false,
  },
};
